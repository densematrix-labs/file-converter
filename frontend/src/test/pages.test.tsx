import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { PricingPage } from '../pages/PricingPage';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Pages', () => {
  describe('HomePage', () => {
    it('renders hero section', () => {
      render(<HomePage />, { wrapper });
      expect(screen.getByText('hero.title')).toBeInTheDocument();
      expect(screen.getByText('hero.titleHighlight')).toBeInTheDocument();
      expect(screen.getByText('hero.subtitle')).toBeInTheDocument();
    });

    it('renders badge text', () => {
      render(<HomePage />, { wrapper });
      expect(screen.getByText('hero.badge')).toBeInTheDocument();
    });

    it('displays format conversion chain', () => {
      render(<HomePage />, { wrapper });
      expect(screen.getAllByText('PNG').length).toBeGreaterThan(0);
      expect(screen.getAllByText('JPG').length).toBeGreaterThan(0);
      expect(screen.getAllByText('WEBP').length).toBeGreaterThan(0);
    });

    it('renders SEO content section', () => {
      render(<HomePage />, { wrapper });
      expect(screen.getByText('seo.whyTitle')).toBeInTheDocument();
      // These have emoji prefix in the rendered output
      expect(screen.getByText(/seo\.privacy\.title/)).toBeInTheDocument();
      expect(screen.getByText(/seo\.speed\.title/)).toBeInTheDocument();
      expect(screen.getByText(/seo\.free\.title/)).toBeInTheDocument();
      expect(screen.getByText(/seo\.formats\.title/)).toBeInTheDocument();
    });

    it('renders comparison table', () => {
      render(<HomePage />, { wrapper });
      expect(screen.getByText('comparison.title')).toBeInTheDocument();
      expect(screen.getByText('comparison.feature')).toBeInTheDocument();
      expect(screen.getByText('comparison.price')).toBeInTheDocument();
    });

    it('shows advantages in comparison', () => {
      render(<HomePage />, { wrapper });
      // Should have comparison features
      expect(screen.getByText('comparison.price')).toBeInTheDocument();
      expect(screen.getByText('comparison.upload')).toBeInTheDocument();
    });
  });

  describe('PricingPage', () => {
    it('renders page title', () => {
      render(<PricingPage />, { wrapper });
      expect(screen.getByText('pricing.title')).toBeInTheDocument();
      expect(screen.getByText('pricing.subtitle')).toBeInTheDocument();
    });

    it('renders free plan', () => {
      render(<PricingPage />, { wrapper });
      expect(screen.getByText('pricing.free.title')).toBeInTheDocument();
      expect(screen.getByText('pricing.free.price')).toBeInTheDocument();
      expect(screen.getByText('pricing.free.cta')).toBeInTheDocument();
    });

    it('renders pro plan', () => {
      render(<PricingPage />, { wrapper });
      expect(screen.getByText('pricing.pro.title')).toBeInTheDocument();
      expect(screen.getByText('pricing.pro.price')).toBeInTheDocument();
      expect(screen.getByText('pricing.pro.period')).toBeInTheDocument();
      expect(screen.getByText('pricing.pro.cta')).toBeInTheDocument();
    });

    it('shows support badge on pro plan', () => {
      render(<PricingPage />, { wrapper });
      expect(screen.getByText('Support Us')).toBeInTheDocument();
    });

    it('free plan CTA is disabled', () => {
      render(<PricingPage />, { wrapper });
      const ctaButton = screen.getByText('pricing.free.cta').closest('button');
      expect(ctaButton).toBeDisabled();
    });

    it('pro plan CTA is enabled', () => {
      render(<PricingPage />, { wrapper });
      const ctaButton = screen.getByText('pricing.pro.cta').closest('button');
      expect(ctaButton).not.toBeDisabled();
    });
  });
});
