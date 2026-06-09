import { MemoryRouter, Route, Routes } from 'react-router';

import { render as renderRaw } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NotFoundPage from './NotFoundPage';

import { render, screen, userEvent } from '@/test/test-utils';
import { ThemeModeProvider } from '@/ui/ThemeModeProvider';

describe('NotFoundPage', () => {
  describe('renders page elements', () => {
    it('renders the page title', () => {
      render(<NotFoundPage />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page Not Found');
    });

    it('renders the home navigation button with correct href', () => {
      render(<NotFoundPage />);
      const link = screen.getByRole('link', { name: 'Main Page' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
    });

    it('renders the icon', () => {
      const { container } = render(<NotFoundPage />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    it('navigates to home when the button is clicked', async () => {
      const user = userEvent.setup();
      renderRaw(
        <ThemeModeProvider>
          <MemoryRouter initialEntries={['/missing']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MemoryRouter>
        </ThemeModeProvider>
      );
      await user.click(screen.getByRole('link', { name: 'Main Page' }));
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });
});
