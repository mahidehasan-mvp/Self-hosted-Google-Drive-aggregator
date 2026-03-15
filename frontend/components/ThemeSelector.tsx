"use client";

import { useTheme, Theme } from "@/contexts/ThemeContext";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative group ml-4">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-border bg-brand-surface hover:border-brand-accent transition-colors">
        <div className={`w-3 h-3 rounded-full ${
          theme === 'orange' ? 'bg-orange-500' :
          theme === 'cyberpunk' ? 'bg-fuchsia-500' :
          'bg-emerald-500'
        }`}></div>
        <span className="text-xs font-semibold text-brand-gray capitalize">{theme} Theme</span>
        <svg className="w-4 h-4 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute top-full right-0 mt-2 w-48 bg-brand-surface border border-brand-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2 flex flex-col gap-1">
          {(['orange', 'cyberpunk', 'emerald'] as Theme[]).map((t) => (
             <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                theme === t ? 'bg-brand-accent/10 text-brand-accent' : 'text-brand-gray hover:bg-brand-dark hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${
                t === 'orange' ? 'bg-orange-500' :
                t === 'cyberpunk' ? 'bg-fuchsia-500' :
                'bg-emerald-500'
              }`}></div>
              <span className="capitalize">{t}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
