interface LanguageToggleProps {
  lang: 'en' | 'fr';
  toggleLanguage: () => void;
}

export function LanguageToggle({ lang, toggleLanguage }: LanguageToggleProps  ) {
  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 transition-colors flex items-center gap-1.5"
      aria-label="Switch Language"
    >
      <span className={lang === 'en' ? 'text-[#7757a5] font-extrabold' : 'text-slate-400'}>EN</span>
      <span className="text-slate-300">|</span>
      <span className={lang === 'fr' ? 'text-[#7757a5] font-extrabold' : 'text-slate-400'}>FR</span>
    </button>
  );
}
