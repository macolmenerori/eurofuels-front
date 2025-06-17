import { useTranslation } from 'react-i18next';

import { ThemeToggle } from './ThemeToggle';

import { fireEvent, render, screen } from '@/test/setupTests';
import { useTheme } from '@/ui/theme/ThemeContext';

// Mock the modules
jest.mock('@/ui/theme/ThemeContext', () => ({
  useTheme: jest.fn()
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn()
}));

jest.mock('@mui/icons-material/Brightness4', () => ({
  __esModule: true,
  default: () => <div data-testid="dark-icon" />
}));

jest.mock('@mui/icons-material/Brightness7', () => ({
  __esModule: true,
  default: () => <div data-testid="light-icon" />
}));

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn();
  const mockT = jest.fn().mockReturnValue('Change Theme');

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
  });

  test('renders light mode with dark icon', () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'light', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    expect(screen.getByTestId('dark-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('light-icon')).not.toBeInTheDocument();
    expect(mockT).toHaveBeenCalledWith('components.navbar.changeTheme');
  });

  test('renders dark mode with light icon', () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'dark', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    expect(screen.getByTestId('light-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('dark-icon')).not.toBeInTheDocument();
  });

  test('calls toggleTheme when button is clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({ mode: 'light', toggleTheme: mockToggleTheme });
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
