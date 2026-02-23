import { useTranslation } from 'react-i18next';
import { Check, Zap } from 'lucide-react';

export function PricingPage() {
  const { t } = useTranslation();

  const freeFeatures = (t('pricing.free.features', { returnObjects: true }) || []) as string[];
  const proFeatures = (t('pricing.pro.features', { returnObjects: true }) || []) as string[];
  
  // Fallback for test environment
  const safeFreeFeatures = Array.isArray(freeFeatures) ? freeFeatures : [];
  const safeProFeatures = Array.isArray(proFeatures) ? proFeatures : [];

  return (
    <main className="flex-1 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-industrial-text mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-lg text-industrial-muted">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-industrial-surface rounded-xl border border-industrial-border p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-industrial-text mb-2">
                {t('pricing.free.title')}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-industrial-text">
                  {t('pricing.free.price')}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {safeFreeFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-industrial-success flex-shrink-0 mt-0.5" />
                  <span className="text-industrial-text text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="w-full py-3 px-4 bg-industrial-bg border border-industrial-border rounded-lg font-mono text-sm uppercase tracking-wider text-industrial-muted cursor-not-allowed"
            >
              {t('pricing.free.cta')}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-industrial-surface rounded-xl border-2 border-industrial-accent p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 bg-industrial-accent text-white text-xs font-mono uppercase rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Support Us
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-industrial-text mb-2">
                {t('pricing.pro.title')}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-industrial-accent">
                  {t('pricing.pro.price')}
                </span>
                <span className="text-industrial-muted text-sm">
                  {t('pricing.pro.period')}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {safeProFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-industrial-accent flex-shrink-0 mt-0.5" />
                  <span className="text-industrial-text text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 px-4 bg-industrial-accent hover:bg-industrial-accent/90 rounded-lg font-mono text-sm uppercase tracking-wider text-white transition-colors">
              {t('pricing.pro.cta')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
