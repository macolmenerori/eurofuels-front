import { describe, expect, it } from 'vitest';

import AboutPage from './AboutPage';

import { render, screen } from '@/test/test-utils';

describe('AboutPage', () => {
  describe('section headings', () => {
    it('renders the "About this project" heading', () => {
      render(<AboutPage />);
      expect(screen.getByText('About this project')).toBeInTheDocument();
    });

    it('renders the "Where the data comes from" heading', () => {
      render(<AboutPage />);
      expect(screen.getByText('Where the data comes from')).toBeInTheDocument();
    });
  });

  describe('external links', () => {
    it('renders the backend repository link with correct href and target', () => {
      render(<AboutPage />);
      const link = screen.getByRole('link', { name: 'Backend repository' });
      expect(link).toHaveAttribute('href', 'https://github.com/macolmenerori/eurofuels-back');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('renders the author link with correct href and target', () => {
      render(<AboutPage />);
      const link = screen.getByRole('link', { name: 'Miguel Colmenero' });
      expect(link).toHaveAttribute('href', 'https://miguelcolmenero.net');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('renders the source code link with correct href and target', () => {
      render(<AboutPage />);
      const link = screen.getByRole('link', { name: 'Source code' });
      expect(link).toHaveAttribute('href', 'https://github.com/macolmenerori/eurofuels-front');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});
