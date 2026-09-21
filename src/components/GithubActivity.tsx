"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { GithubActivity as Activity, GhDay } from "@/data/stats";
import { cn } from "@/lib/utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LEVEL_FILL = [
  "bg-bamboo-100 dark:bg-ink-softdark",
  "bg-bamboo-300/50 dark:bg-bamboo-700/50",
  "bg-bamboo-400/70 dark:bg-bamboo-600/70",
  "bg-bamboo-500 dark:bg-bamboo-500/90",
  "bg-bamboo-600 dark:bg-bamboo-400",
] as const;

function Cell({ day, index }: { day: GhDay; index: number }) {
  const [hovered, setHovered] = useState(false);
  if (!day.date) return <span className="w-[11px] h-[11px]" />;

  const date = new Date(day.date + "T00:00:00");
  const label = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;

  return (
    <span className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: Math.min(index * 0.001, 0.8), duration: 0.2 }}
        className={cn(
          "block w-[11px] h-[11px] rounded-[3px] transition-shadow",
          LEVEL_FILL[day.level],
          hovered && "ring-2 ring-bamboo-400/70"
        )}
        title={label}
      />
      {hovered && (
        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap rounded-lg bg-ink dark:bg-ink-light px-2 py-1 text-[10px] font-mono text-paper-light shadow-lg z-20">
          {label}
        </span>
      )}
    </span>
  );
}

function YearGrid({ weeks }: { weeks: Activity["years"][number]["weeks"] }) {
  // Month labels: first week index where each month starts.
  const monthLabels: { col: number; name: string }[] = [];
  weeks.forEach((w, i) => {
    const first = w.find((d) => d.date);
    if (!first) return;
    const d = new Date(first.date + "T00:00:00");
    if (
      d.getDate() <= 7 &&
      (monthLabels.length === 0 || monthLabels[monthLabels.length - 1].name !== MONTHS[d.getMonth()])
    ) {
      monthLabels.push({ col: i, name: MONTHS[d.getMonth()] });
    }
  });

  return (
    <div className="overflow-x-auto scrollbar-hide pb-1">
      <div className="min-w-[720px]">
        <div className="relative h-4 mb-1.5 ml-6" aria-hidden>
          {monthLabels.map((m) => (
            <span
              key={`${m.name}-${m.col}`}
              className="absolute font-mono text-[9px] uppercase tracking-wider text-ink-faint"
              style={{ left: `${m.col * 13}px` }}
            >
              {m.name}
            </span>
          ))}
        </div>
        <div
          className="flex gap-[2px] ml-6"
          role="img"
          aria-label="GitHub contribution heatmap"
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[2px]">
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week.find((d) => d.date && new Date(d.date + "T00:00:00").getDay() === di);
                return day ? (
                  <Cell key={day.date} day={day} index={wi * 7 + di} />
                ) : (
                  <span key={`empty-${wi}-${di}`} className="w-[11px] h-[11px]" />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GithubActivity({ activity }: { activity: Activity }) {
  const years = activity.years;
  const [selected, setSelected] = useState<string>(() =>
    years.length > 0 ? String(years[0].year) : "all"
  );

  const current = useMemo(
    () => years.find((y) => String(y.year) === selected) ?? years[0],
    [years, selected]
  );

  if (years.length === 0) {
    return (
      <p className="text-sm text-ink-soft dark:text-ink-faint">
        Contribution data is unavailable right now. It will appear again on the next refresh.
      </p>
    );
  }

  return (
    <div>
      {/* Year tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4" role="tablist" aria-label="Choose a year">
        <button
          role="tab"
          aria-selected={selected === "all"}
          onClick={() => setSelected("all")}
          className={cn(
            "px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border transition-colors",
            selected === "all"
              ? "bg-ink dark:bg-ink-light text-paper-light dark:text-paper-dark border-ink dark:border-ink-light"
              : "bg-white/70 dark:bg-ink-card/60 text-ink-soft dark:text-ink-faint border-ink/10 dark:border-ink-light/10 hover:border-bamboo-500/50"
          )}
        >
          All time
        </button>
        {years.map((y) => (
          <button
            key={y.year}
            role="tab"
            aria-selected={selected === String(y.year)}
            onClick={() => setSelected(String(y.year))}
            className={cn(
              "px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border transition-colors",
              selected === String(y.year)
                ? "bg-ink dark:bg-ink-light text-paper-light dark:text-paper-dark border-ink dark:border-ink-light"
                : "bg-white/70 dark:bg-ink-card/60 text-ink-soft dark:text-ink-faint border-ink/10 dark:border-ink-light/10 hover:border-bamboo-500/50"
            )}
          >
            {y.year}
          </button>
        ))}
      </div>

      <YearGrid weeks={current.weeks} />

      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
        <p className="text-sm text-ink-soft dark:text-ink-faint">
          {selected === "all" ? (
            <>
              <strong className="font-display font-bold text-ink dark:text-ink-light">
                {activity.totalAll.toLocaleString()}
              </strong>{" "}
              contributions since {years[years.length - 1].year}
            </>
          ) : (
            <>
              <strong className="font-display font-bold text-ink dark:text-ink-light">
                {current.total.toLocaleString()}
              </strong>{" "}
              contributions in {current.year}
            </>
          )}
          {activity.streak > 1 && (
            <>
              {" | "}
              <strong className="font-display font-bold text-bamboo-600 dark:text-bamboo-400">
                {activity.streak}-day
              </strong>{" "}
              current streak
            </>
          )}
        </p>
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="font-mono text-[10px] text-ink-faint mr-1">Less</span>
          {LEVEL_FILL.map((fill, i) => (
            <span key={i} className={cn("w-[10px] h-[10px] rounded-[3px]", fill)} />
          ))}
          <span className="font-mono text-[10px] text-ink-faint ml-1">More</span>
        </div>
      </div>
    </div>
  );
}
