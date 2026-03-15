"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Theme } from "@/contexts/ThemeContext";
import ThemeSelector from "@/components/ThemeSelector";

const features = [
  {
    icon: (
      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
    ),
    color: "text-brand-accent",
    bg: "bg-orange-500/10",
    title: "Unified Storage Pool",
    desc: "Combine unlimited Google Drive accounts into one dashboard. N accounts × 15 GB = effectively unlimited free cloud storage.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
    ),
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    title: "Smart Upload Routing",
    desc: "Least-Used-Space strategy automatically routes every upload to the account with the most free space. Zero manual management.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
    ),
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    title: "Folder Navigation",
    desc: "Full folder hierarchy with breadcrumb bar, grid & list views, search, sort, and file type filters across all accounts.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
    ),
    color: "text-green-400",
    bg: "bg-green-500/10",
    title: "Secure Local Access",
    desc: "PIN-protected with bcrypt hashing. Secrets live in the local database — no .env files, no cloud auth service, no telemetry.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
    ),
    color: "text-red-400",
    bg: "bg-red-500/10",
    title: "Rich Analytics",
    desc: "Storage breakdown per account, file type distribution, weekly upload activity, and per-type storage bars — all client-side.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
    ),
    color: "text-brand-gray",
    bg: "bg-gray-500/10",
    title: "Open Source",
    desc: "100% free and open source. Self-hosted, privacy-first. Inspect every line, contribute improvements, or fork it for your needs.",
  },
];



function DriveIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 48 48">
      <path fill="#1e88e5" d="M38.59,39c-0.535,0.93-0.298,1.68-1.195,2.197C36.498,41.715,35.465,42,34.39,42H13.61 c-1.074,0-2.106-0.285-3.004-0.802C9.708,40.681,9.945,39.93,9.41,39l7.67-9h13.84L38.59,39z"></path>
      <path fill="#fbc02d" d="M27.463,6.999c1.073-0.002,2.104-0.716,3.001-0.198c0.897,0.519,1.66,1.27,2.197,2.201l10.39,17.996 c0.537,0.93,0.807,1.967,0.808,3.002c0.001,1.037-1.267,2.073-1.806,3.001l-11.127-3.005l-6.924-11.993L27.463,6.999z"></path>
      <path fill="#e53935" d="M43.86,30c0,1.04-0.27,2.07-0.81,3l-3.67,6.35c-0.53,0.78-1.21,1.4-1.99,1.85L30.92,30H43.86z"></path>
      <path fill="#4caf50" d="M5.947,33.001c-0.538-0.928-1.806-1.964-1.806-3c0.001-1.036,0.27-2.073,0.808-3.004l10.39-17.996 c0.537-0.93,1.3-1.682,2.196-2.2c0.897-0.519,1.929,0.195,3.002,0.197l3.459,11.009l-6.922,11.989L5.947,33.001z"></path>
      <path fill="#1565c0" d="M17.08,30l-6.47,11.2c-0.78-0.45-1.46-1.07-1.99-1.85L4.95,33c-0.54-0.93-0.81-1.96-0.81-3H17.08z"></path>
      <path fill="#2e7d32" d="M30.46,6.8L24,18L17.53,6.8c0.78-0.45,1.66-0.73,2.6-0.79L27.46,6C28.54,6,29.57,6.28,30.46,6.8z"></path>
    </svg>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-brand-accent text-white shadow-lg transition-all z-50 hover:-translate-y-1 hover:shadow-xl ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      aria-label="Back to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dp-bg text-dp-text">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 border-b border-brand-border/50 bg-brand-dark/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <span className="font-bold text-white tracking-tight">DrivePool</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/docs" className="text-brand-gray hover:text-white transition-colors">Docs</Link>
            <a href="https://github.com/mahidehasan-mvp/Self-hosted-Google-Drive-aggregator" target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-white transition-colors">GitHub</a>
            <Link href="/login" className="bg-brand-accent hover:opacity-80 text-white px-5 py-2 rounded-full transition-all">Get Started</Link>
            <ThemeSelector />
          </div>
        </nav>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 grid-bg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-border/30 border border-brand-border text-xs font-semibold text-brand-accent mb-8 uppercase tracking-widest">
            <span>Open Source</span>
            <span className="w-1 h-1 rounded-full bg-brand-gray"></span>
            <span>Free Forever</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Your Storage, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-accent">Multiplied</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-gray mb-10 leading-relaxed max-w-2xl mx-auto">
            DrivePool aggregates multiple Google Drive accounts into a single unified dashboard.
            Get up to <span className="text-white font-semibold">N × 15 GB</span> free cloud storage with smart routing and rich analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:opacity-90 text-white font-bold rounded-xl shadow-lg shadow-brand-accent/20 transition-all flex items-center justify-center gap-2">
              Open Dashboard
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </Link>
            <a href="https://github.com/mahidehasan-mvp/Self-hosted-Google-Drive-aggregator" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-brand-surface border border-brand-border hover:border-brand-gray text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg>
              Star on GitHub
            </a>
          </div>

          {/* Connection Visualization (Minimal Orange) */}
          <div className="flex items-center justify-center gap-6 opacity-80">
            <div className="p-3 bg-brand-surface border border-brand-border rounded-xl shadow-lg">
              <DriveIcon className="w-10 h-10" />
            </div>
            <svg className="w-5 h-5 text-brand-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            <div className="p-3 bg-brand-surface border border-brand-border rounded-xl shadow-lg">
              <DriveIcon className="w-10 h-10" />
            </div>
            <svg className="w-6 h-6 text-brand-border" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            <div className="p-4 bg-brand-accent/10 border-2 border-brand-accent/50 rounded-2xl shadow-xl shadow-brand-accent/20">
              <div className="w-12 h-12 bg-brand-accent rounded-xl flex items-center justify-center shadow-lg shadow-brand-accent/40">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Grid ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-y border-brand-border/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">15 GB</div>
            <div className="text-xs text-brand-gray uppercase tracking-widest">Free Per Account</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">Unlimited</div>
            <div className="text-xs text-brand-gray uppercase tracking-widest">Max Accounts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">Never</div>
            <div className="text-xs text-brand-gray uppercase tracking-widest">Data Leaves Network</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">$0</div>
            <div className="text-xs text-brand-gray uppercase tracking-widest">Cost Always</div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need, <span className="text-brand-accent">nothing you don&apos;t</span>
            </h2>
            <p className="text-brand-gray text-lg">
              A focused set of features built for power users who want more from their free cloud storage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-2xl bg-brand-surface/40 border border-brand-border/50 transition-all hover:border-brand-accent hover:bg-brand-surface/80 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.bg}`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-brand-gray leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard pages showcase ────────────────────────── */}
      <section className="py-24 bg-brand-surface/20 border-y border-brand-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Six dedicated views, <span className="text-brand-accent">one coherent app</span></h2>
            <p className="text-brand-gray">Every section of DrivePool is purpose-built — no bloat, no clutter.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl border border-brand-border bg-brand-dark/50 hover:border-brand-accent/50 transition-colors group">
              <span className="text-[10px] uppercase tracking-widest text-brand-accent font-bold mb-2 block">Overview</span>
              <p className="text-sm text-brand-gray group-hover:text-white transition-colors">Stats cards, per-account storage bars, and recent files.</p>
            </div>
            <div className="p-6 rounded-xl border border-brand-border bg-brand-dark/50 hover:border-brand-accent/50 transition-colors group">
              <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-2 block">Files</span>
              <p className="text-sm text-brand-gray group-hover:text-white transition-colors">Upload, browse, rename, move, and download files.</p>
            </div>
            <div className="p-6 rounded-xl border border-brand-border bg-brand-dark/50 hover:border-brand-accent/50 transition-colors group">
              <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-2 block">Shared With Me</span>
              <p className="text-sm text-brand-gray group-hover:text-white transition-colors">Browse files and folders that others have shared.</p>
            </div>
            <div className="p-6 rounded-xl border border-brand-border bg-brand-dark/50 hover:border-brand-accent/50 transition-colors group">
              <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold mb-2 block">Trash</span>
              <p className="text-sm text-brand-gray group-hover:text-white transition-colors">See all trashed files, restore them, or delete permanently.</p>
            </div>
            <div className="p-6 rounded-xl border border-brand-border bg-brand-dark/50 hover:border-brand-accent/50 transition-colors group">
              <span className="text-[10px] uppercase tracking-widest text-green-400 font-bold mb-2 block">Analytics</span>
              <p className="text-sm text-brand-gray group-hover:text-white transition-colors">Weekly activity, storage by account, and type distribution.</p>
            </div>
            <div className="p-6 rounded-xl border border-brand-border bg-brand-dark/50 hover:border-brand-accent/50 transition-colors group">
              <span className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-2 block">Settings</span>
              <p className="text-sm text-brand-gray group-hover:text-white transition-colors">Manage your profile, connect accounts, and view quotas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Setup Section ─────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get started in minutes</h2>
            <p className="text-brand-gray">Our step-by-step guide walks you from cloning the repo to a fully working storage pool.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-brand-surface/30 border border-brand-border/50">
              <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-brand-border text-brand-gray font-bold">01</span>
              <div>
                <h4 className="text-white font-semibold">Create Google Cloud credentials</h4>
                <p className="text-sm text-brand-gray">Generate OAuth client IDs for each Google account you want to aggregate.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-brand-surface/30 border border-brand-border/50">
              <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-brand-border text-brand-gray font-bold">02</span>
              <div>
                <h4 className="text-white font-semibold">Run generate_secrets.py</h4>
                <p className="text-sm text-brand-gray">Securely store your secrets locally in the encrypted database.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-brand-surface/30 border border-brand-border/50">
              <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-brand-border text-brand-gray font-bold">03</span>
              <div>
                <h4 className="text-white font-semibold">Start servers and connect</h4>
                <p className="text-sm text-brand-gray">Launch the backend and frontend, then connect your accounts via OAuth.</p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/docs" className="inline-flex flex-col items-center group">
              <span className="px-8 py-3 bg-brand-accent hover:opacity-90 text-white font-bold rounded-xl transition-all mb-3">Read the Full Setup Guide</span>
              <span className="text-xs text-brand-gray">Takes about 15 minutes end-to-end</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Open Source CTA ────────────────────────────────── */}
      <section className="py-24 px-6 mb-24">
        <div className="max-w-5xl mx-auto rounded-3xl p-12 md:p-20 text-center border border-brand-border bg-gradient-to-b from-brand-surface to-brand-dark overflow-hidden relative">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-8 text-brand-gray">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg>
              <span className="font-bold tracking-widest text-xs uppercase">Open Source Initiative</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built in the open, for everyone</h2>
            <p className="text-brand-gray text-lg max-w-2xl mx-auto mb-10">
              DrivePool is free software. Inspect every line, contribute improvements, report issues, or fork it for your own use. No vendor lock-in. No subscription. No data harvesting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto px-10 py-4 bg-brand-accent hover:opacity-90 text-white font-bold rounded-xl transition-all">Start Using DrivePool</Link>
              <a href="https://github.com/mahidehasan-mvp/Self-hosted-Google-Drive-aggregator" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-4 border border-brand-border hover:border-brand-gray text-white font-bold rounded-xl transition-all">View on GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t border-brand-border/30 bg-brand-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-border rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <span className="font-bold text-brand-gray text-sm">DrivePool</span>
          </div>
          <p className="text-xs text-brand-gray">Free &amp; open source • Self-hosted Google Drive aggregator • © 2024-26</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/mahidehasan-mvp/Self-hosted-Google-Drive-aggregator" className="text-brand-gray hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg></a>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
