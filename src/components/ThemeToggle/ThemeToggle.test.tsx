import { useTranslation } from 'react-i18next';

import { ThemeToggle } from './ThemeToggle';

import { render, screen, userEvent } from '@/test/setupTests';
import { useTheme } from '@/ui/theme/ThemeContext';

// Mock the modules
jest.mock('@/ui/theme/ThemeContext', () => ({
  useTheme: jest.fn()
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn()
}));

jest.mock('@macolmenerori/component-library/theme-switch', () => ({
  ThemeSwitch: ({
    enableDarkMode,
    setEnableDarkMode,
    size
  }: {
    enableDarkMode: boolean;
    setEnableDarkMode: (value: boolean) => void;
    size?: string;
  }) => (
    <button
      data-testid="theme-switch"
      data-dark-mode={enableDarkMode}
      data-size={size}
      onClick={() => setEnableDarkMode(!enableDarkMode)}
      aria-label="toggle theme"
    >
      ThemeSwitch
    </button>
  )
}));

jest.mock('@macolmenerori/component-library/theme-switch-css', () => ({}));

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn();
  const mockT = jest.fn().mockReturnValue('Change Theme');

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
  });

  test('renders with dark mode disabled in light mode', () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'light', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    const switchElement = screen.getByTestId('theme-switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('data-dark-mode', 'false');
    expect(switchElement).toHaveAttribute('data-size', 'small');
    expect(mockT).toHaveBeenCalledWith('components.navbar.changeTheme');
  });

  test('renders with dark mode enabled in dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'dark', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    const switchElement = screen.getByTestId('theme-switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('data-dark-mode', 'true');
  });

  test('calls toggleTheme when switch is clicked', async () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'light', toggleTheme: mockToggleTheme });
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const switchElement = screen.getByTestId('theme-switch');
    await user.click(switchElement);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
