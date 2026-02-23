import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileImage, Zap } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-industrial-border bg-industrial-bg/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-industrial-accent rounded-lg flex items-center justify-center">
            <FileImage className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-industrial-text tracking-tight">
              FileConvert
            </h1>
            <p className="text-xs font-mono text-industrial-muted uppercase tracking-wider">
              {t('header.tagline')}
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-industrial-muted hover:text-industrial-text transition-colors"
          >
            {t('nav.converter')}
          </Link>
          <Link
            to="/pricing"
            className="text-sm text-industrial-muted hover:text-industrial-text transition-colors flex items-center gap-1"
          >
            <Zap className="w-4 h-4" />
            {t('nav.pricing')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
