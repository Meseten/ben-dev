// Server-side data fetchers for live external stats.
// Every function returns a fallback value on failure; the page must render.

export type KrnaStats = {
  version: string;
  requiresPython: string;
  /** PyPI downloads in the last month (pypistats.org). */
  downloads: number | null;
  /** All-time downloads (pepy.tech, falls back to pypistats overall). */
  totalDownloads: number | null;
  live: boolean;
};

type PypiInfo = {
  info?: { version?: string; requires_python?: string };
  urls?: { filename?: string; upload_time_iso_8601?: string }[];
};

export async function getKrnaStats(): Promise<KrnaStats> {
  const fallback: KrnaStats = {
    version: "1.0.2",
    requiresPython: ">=3.11",
    downloads: null,
    totalDownloads: null,
    live: false,
  };

  try {
    const [pypiRes, recentRes, totalRes, pepyRes] = await Promise.allSettled([
      fetch("https://pypi.org/pypi/krna/json", { next: { revalidate: 3600 } }),
      fetch("https://pypistats.org/api/packages/krna/recent", { next: { revalidate: 3600 } }),
      fetch("https://pypistats.org/api/packages/krna/overall", { next: { revalidate: 3600 } }),
      // pepy.tech tracks all-time totals; the free endpoint is occasionally
      // rate-limited, hence allSettled.
      fetch("https://pepy.tech/api/v2/projects/krna", { next: { revalidate: 3600 } }),
    ]);

    if (pypiRes.status === "fulfilled" && pypiRes.value.ok) {
      const data = (await pypiRes.value.json()) as PypiInfo;
      if (data.info?.version) fallback.version = data.info.version;
      if (data.info?.requires_python) fallback.requiresPython = data.info.requires_python;
    }

    if (recentRes.status === "fulfilled" && recentRes.value.ok) {
      const data = (await recentRes.value.json()) as { data?: { last_month?: number } };
      if (typeof data.data?.last_month === "number") {
        fallback.downloads = data.data.last_month;
      }
    }

    if (pepyRes.status === "fulfilled" && pepyRes.value.ok) {
      const data = (await pepyRes.value.json()) as { total_downloads?: number };
      if (typeof data.total_downloads === "number" && data.total_downloads > 0) {
        fallback.totalDownloads = data.total_downloads;
      }
    }

    if (totalRes.status === "fulfilled" && totalRes.value.ok) {
      const data = (await totalRes.value.json()) as {
        data?: { category?: string; downloads?: number }[];
      };
      const rows = data.data ?? [];
      // Only count rows when pepy didn't already give us an all-time total.
      if (fallback.totalDownloads === null && rows.length > 0) {
        const noMirrors = rows.filter((r) => r.category === "without_mirrors");
        const source = noMirrors.length > 0 ? noMirrors : rows;
        const latest = source[source.length - 1];
        if (latest && typeof latest.downloads === "number") {
          fallback.totalDownloads = latest.downloads;
        }
      }
    }

    fallback.live = fallback.downloads !== null || fallback.totalDownloads !== null;
    return fallback;
  } catch {
    return fallback;
  }
}

export type GhDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GithubActivity = {
  /** One entry per available year (newest first). */
  years: { year: number; total: number; weeks: GhDay[][] }[];
  totalAll: number;
  streak: number;
  live: boolean;
};

function streakOf(weeks: { date: string; count: number }[][]): number {
  const days = weeks.flatMap((w) => w.filter((d) => d.date));
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
}

function toWeeks(days: GhDay[]): GhDay[][] {
  if (days.length === 0) return [];
  const firstDow = new Date(days[0].date + "T00:00:00").getDay();
  const padded: GhDay[] = [
    ...Array.from({ length: firstDow }, () => ({ date: "", count: 0, level: 0 as const })),
    ...days,
  ];
  const weeks: GhDay[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

export async function getGithubActivity(): Promise<GithubActivity> {
  const fallback: GithubActivity = { years: [], totalAll: 0, streak: 0, live: false };

  const query = `query($user: String!) {
    user(login: $user) {
      contributionsCollection {
        contributionYears
      }
    }
  }`;

  // --- Primary: GitHub GraphQL with GITHUB_TOKEN (full, exact history) ---
  try {
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      const res = await fetch(
        "https://api.github.com/graphql",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ query, variables: { user: "Meseten" } }),
          cache: "no-store",  // GraphQL POSTs are uncached by design; the page itself is ISR.
        },
      );
      if (res.ok) {
        const json = (await res.json()) as {
          data?: { user?: { contributionsCollection?: { contributionYears?: number[] } } };
        };
        const years = json.data?.user?.contributionsCollection?.contributionYears ?? [];
        if (years.length > 0) {
          // Fetch each year's calendar (GraphQL caps at ~10 parallel; years are few).
          const yearResults = await Promise.allSettled(
            years.slice(0, 8).map(async (y) => {
              const calQuery = `query($user: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $user) {
                  contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                      totalContributions
                      weeks { contributionDays { date contributionCount contributionLevel } }
                    }
                  }
                }
              }`;
              const from = `${y}-01-01T00:00:00Z`;
              const to = `${y}-12-31T23:59:59Z`;
              const r = await fetch("https://api.github.com/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ query: calQuery, variables: { user: "Meseten", from, to } }),
                cache: "no-store",
              });
              if (!r.ok) throw new Error("year fetch failed");
              const j = (await r.json()) as {
                data?: {
                  user?: {
                    contributionsCollection?: {
                      contributionCalendar?: {
                        totalContributions?: number;
                        weeks?: {
                          contributionDays?: {
                            date: string;
                            contributionCount: number;
                            contributionLevel?: string;
                          }[];
                        }[];
                      };
                    };
                  };
                };
              };
              const cal = j.data?.user?.contributionsCollection?.contributionCalendar;
              if (!cal?.weeks) throw new Error("no calendar");
              const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
                NONE: 0,
                FIRST_QUARTILE: 1,
                SECOND_QUARTILE: 2,
                THIRD_QUARTILE: 3,
                FOURTH_QUARTILE: 4,
              };
              return {
                year: y,
                total: cal.totalContributions ?? 0,
                weeks: cal.weeks.map((w) =>
                  (w.contributionDays ?? []).map((d) => ({
                    date: d.date,
                    count: d.contributionCount,
                    level: (levelMap[String(d.contributionLevel ?? "NONE")] ?? 0) as 0 | 1 | 2 | 3 | 4,
                  })),
                ),
              };
            }),
          );
          const ok = yearResults
            .filter((r): r is PromiseFulfilledResult<GithubActivity["years"][number]> => r.status === "fulfilled")
            .map((r) => r.value)
            .sort((a, b) => b.year - a.year);
          if (ok.length > 0) {
            return {
              years: ok,
              totalAll: ok.reduce((acc, y) => acc + y.total, 0),
              streak: streakOf(ok[0].weeks),
              live: true,
            };
          }
        }
      }
    }
  } catch {
    // Fall through to the public API.
  }

  // --- Fallback: community contributions API, y=all (full available history) ---
  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/Meseten?y=all", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
    };
    const days = data.contributions;
    if (!days || days.length < 100) return fallback;

    // Group by year, newest first.
    const byYear = new Map<number, GhDay[]>();
    for (const d of days) {
      const y = Number(d.date.slice(0, 4));
      if (!byYear.has(y)) byYear.set(y, []);
      byYear.get(y)!.push(d);
    }
    const years = [...byYear.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, yearDays]) => ({
        year,
        total: data.total?.[String(year)] ?? yearDays.reduce((acc, d) => acc + d.count, 0),
        weeks: toWeeks(yearDays),
      }));

    const current = years[0];
    return {
      years,
      totalAll: years.reduce((acc, y) => acc + y.total, 0),
      streak: streakOf(current.weeks),
      live: true,
    };
  } catch {
    return fallback;
  }
}
