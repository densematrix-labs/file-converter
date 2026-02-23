import { useTranslation } from 'react-i18next';
import { Shield, Zap, Lock } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-industrial-border mt-auto py-8 bg-industrial-surface">
      <div className="max-w-6xl mx-auto px-4">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-industrial-bg flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-industrial-accent" />
            </div>
            <div>
              <h4 className="font-medium text-industrial-text">{t('footer.privacy')}</h4>
              <p className="text-sm text-industrial-muted">{t('footer.privacyDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-industrial-bg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-industrial-accent" />
            </div>
            <div>
              <h4 className="font-medium text-industrial-text">{t('footer.fast')}</h4>
              <p className="text-sm text-industrial-muted">{t('footer.fastDesc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-industrial-bg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-industrial-accent" />
            </div>
            <div>
              <h4 className="font-medium text-industrial-text">{t('footer.free')}</h4>
              <p className="text-sm text-industrial-muted">{t('footer.freeDesc')}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-industrial-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-industrial-muted">
            © {new Date().getFullYear()} FileConvert — CloudConvert Alternative
          </p>
          <div className="flex items-center gap-4 text-sm text-industrial-muted">
            <a href="/privacy" className="hover:text-industrial-accent transition-colors">
              {t('footer.privacyPolicy')}
            </a>
            <a href="/terms" className="hover:text-industrial-accent transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
