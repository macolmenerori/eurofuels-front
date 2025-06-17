import { Navbar } from './Navbar';

import { render, screen } from '@/test/setupTests';

jest.mock('@/components/LanguageSwitcher/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>
}));

jest.mock('@/components/ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Eurofuels')).toBeInTheDocument();
  });

  it('renders the language switcher and theme toggle components in the navbar', () => {
    render(<Navbar />);
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
});
