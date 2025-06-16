import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from './LanguageSwitcher';

import { fireEvent, render, screen } from '@/test/setupTests';

// Mock the react-i18next module
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn()
}));

describe('LanguageSwitcher', () => {
  const changeLanguageMock = jest.fn();
  const tMock = jest.fn((key) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: {
        language: 'en',
        changeLanguage: changeLanguageMock
      },
      t: tMock
    });
  });

  it('renders the language switcher with the current language', () => {
    render(<LanguageSwitcher />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveTextContent('EN');
  });

  it('changes language when a new option is selected', () => {
    render(<LanguageSwitcher />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.mouseDown(selectElement);

    const esOption = screen.getByText('ES');
    fireEvent.click(esOption);

    expect(changeLanguageMock).toHaveBeenCalledWith('es');
  });

  it('displays tooltip with correct translation', () => {
    render(<LanguageSwitcher />);

    expect(tMock).toHaveBeenCalledWith('components.navbar.changeLanguage');
  });
});
