import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const SITE_URL = "https://ben4dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ben James Duag, Systems & Applications Developer | ben4dev",
    template: "%s | ben4dev",
  },
  description:
    "Portfolio of Ben James Duag, a Computer Science student and developer in Cavite, Philippines. Full-stack development, Android AI apps, optimization research, and civic tech, including krna on PyPI.",
  keywords: [
    "Ben James Duag",
    "ben4dev",
    "Computer Science",
    "Cavite",
    "Philippines",
    "Next.js developer Philippines",
    "full stack developer Cavite",
    "Android developer Philippines",
    "TensorFlow Lite",
    "on-device machine learning",
    "RAG systems",
    "krna",
    "PyPI",
    "civic tech",
    "portfolio",
    "hire Filipino developer",
  ],
  authors: [{ name: "Ben James Duag", url: "https://www.linkedin.com/in/ben-james-duag/" }],
  creator: "Ben James Duag",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ben4dev",
    title: "Ben James Duag, Systems & Applications Developer",
    description:
      "Computer Science student in Cavite, PH building Android AI apps, full-stack platforms, civic tech, and the krna optimization package on PyPI.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ben James Duag portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ben James Duag, Systems & Applications Developer",
    description:
      "Computer Science student in Cavite, PH building Android AI apps, full-stack platforms, civic tech, and the krna optimization package on PyPI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ben James Duag",
  alternateName: "ben4dev",
  url: SITE_URL,
  email: "mailto:benjamesduag.edu@gmail.com",
  jobTitle: "Systems & Applications Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cavite",
    addressCountry: "PH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Cavite State University – Naic",
  },
  knowsAbout: [
    "Full Stack Development",
    "Android Development",
    "TensorFlow Lite",
    "On-device Machine Learning",
    "RAG Systems",
    "Optimization Algorithms",
    "Next.js",
    "TypeScript",
    "Python",
    "Kotlin",
    "Civic Tech",
  ],
  sameAs: [
    "https://github.com/Meseten",
    "https://www.linkedin.com/in/ben-james-duag/",
    "https://ph.jobstreet.com/profiles/benjames-duag-BXSkxgJrYT",
    "https://pypi.org/user/Reben/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${unbounded.variable} ${jetbrainsMono.variable} font-sans`}>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-slate-900 focus:text-white focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="aurora-bg" aria-hidden />
          <div className="grain-overlay" aria-hidden />
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
