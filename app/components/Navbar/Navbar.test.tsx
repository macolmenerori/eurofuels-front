import { describe, expect, it } from 'vitest';

import { Navbar } from './Navbar';

import { act, render, screen, userEvent, waitFor } from '@/test/test-utils';

describe('Navbar', () => {
  it('renders the EuroFuel brand wordmark', () => {
    render(<Navbar />);
    // Brand is split across two spans: "Euro" + "Fuel"
    expect(screen.getByText('Euro')).toBeInTheDocument();
    expect(screen.getByText('Fuels')).toBeInTheDocument();
  });

  it('renders the brand logo', () => {
    render(<Navbar />);
    const logo = screen.getByRole('img', { name: /eurofuels logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/icons/favicon.webp');
  });

  it('renders all nav links with EN translations (desktop)', () => {
    render(<Navbar />);
    // Desktop nav links — multiple matches expected (desktop + menu), use getAllByRole
    const links = screen.getAllByRole('link', { name: /map/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /stats/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the language selector', () => {
    render(<Navbar />);
    expect(screen.getByRole('combobox', { name: /language/i })).toBeInTheDocument();
  });

  it('nav links point to correct hrefs', () => {
    render(<Navbar />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((el) => (el as HTMLAnchorElement).getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/stats');
    expect(hrefs).toContain('/about');
  });

  it('changing language selector updates i18n resolvedLanguage', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const select = screen.getByRole('combobox', { name: /language/i });
    await user.click(select);

    // MUI Select renders the listbox as a portal; find the ES option.
    const esOption = await screen.findByRole('option', { name: /es/i });
    await user.click(esOption);

    // i18n.changeLanguage is called internally by handleLangChange (fire-and-forget).
    // waitFor polls inside act(), flushing the pending react-i18next re-render.
    const { default: i18n } = await import('@/i18n');
    await waitFor(() => expect(i18n.resolvedLanguage).toBe('es'));

    // Restore EN so later tests are unaffected — wrap in act() to capture the re-render.
    await act(async () => {
      await i18n.changeLanguage('en');
    });
  });

  // ─── Mobile menu ─────────────────────────────────────────────────────────────

  it('renders the hamburger button with accessible label', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('opens the mobile menu on hamburger click and shows nav links + lang rows + theme switch', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const hamburger = screen.getByRole('button', { name: /open menu/i });
    await user.click(hamburger);

    // Nav link rows appear in the dropdown as menuitems
    await waitFor(() => {
      const items = screen.getAllByRole('menuitem');
      const labels = items.map((el) => el.textContent ?? '');
      expect(labels.some((l) => /map/i.test(l))).toBe(true);
      expect(labels.some((l) => /stats/i.test(l))).toBe(true);
      expect(labels.some((l) => /about/i.test(l))).toBe(true);
    });

    // Language rows (EN active, ES available)
    expect(screen.getByRole('menuitem', { name: /^en$/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /^es$/i })).toBeInTheDocument();

    // Theme switch is present inside the menu (button role from ThemeSwitch)
    expect(screen.getByRole('button', { name: /switch to/i })).toBeInTheDocument();
  });

  it('closes the menu when a nav link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    // Click the Stats menuitem inside the menu
    const statsItem = screen.getByRole('menuitem', { name: /stats/i });
    await user.click(statsItem);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('closes the menu and changes language when a language row is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    await waitFor(() => screen.getByRole('menu'));

    const esRow = screen.getByRole('menuitem', { name: /^es$/i });
    await user.click(esRow);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    const { default: i18n } = await import('@/i18n');
    await waitFor(() => expect(i18n.resolvedLanguage).toBe('es'));

    await act(async () => {
      await i18n.changeLanguage('en');
    });
  });
});
