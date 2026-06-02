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

  it('renders all nav links with EN translations', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /map/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /stats/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('renders the language selector', () => {
    render(<Navbar />);
    expect(screen.getByRole('combobox', { name: /language/i })).toBeInTheDocument();
  });

  it('nav links point to correct hrefs', () => {
    render(<Navbar />);
    const links = screen.getAllByRole('link');
    // Brand link + three nav links — brand is "/"
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
});
