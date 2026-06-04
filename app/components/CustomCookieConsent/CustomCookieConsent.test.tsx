import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { CustomCookieConsent } from './CustomCookieConsent';

import { act, render, screen, userEvent } from '@/test/test-utils';

const EN_MESSAGE =
  "This website uses cookies to enhance the user experience. By clicking 'Accept', you consent to the use of cookies. You can decline the use of cookies by clicking 'Decline'.";
const EN_ACCEPT = 'Accept';
const EN_DECLINE = 'Decline';

function clearConsentCookie() {
  document.cookie = 'eurofuelCookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

beforeEach(() => {
  clearConsentCookie();
});

afterEach(() => {
  clearConsentCookie();
});

describe('CustomCookieConsent', () => {
  it('renders the consent message when no cookie is set', () => {
    render(<CustomCookieConsent />);
    expect(screen.getByText(EN_MESSAGE)).toBeInTheDocument();
  });

  it('renders both Accept and Decline buttons', () => {
    render(<CustomCookieConsent />);
    expect(screen.getByRole('button', { name: EN_ACCEPT })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: EN_DECLINE })).toBeInTheDocument();
  });

  it('hides the banner and sets cookie to true when Accept is clicked', async () => {
    const user = userEvent.setup();
    render(<CustomCookieConsent />);
    await user.click(screen.getByRole('button', { name: EN_ACCEPT }));
    expect(screen.queryByText(EN_MESSAGE)).not.toBeInTheDocument();
    expect(document.cookie).toContain('eurofuelCookieConsent=true');
  });

  it('hides the banner and sets cookie to false when Decline is clicked', async () => {
    const user = userEvent.setup();
    render(<CustomCookieConsent />);
    await user.click(screen.getByRole('button', { name: EN_DECLINE }));
    expect(screen.queryByText(EN_MESSAGE)).not.toBeInTheDocument();
    expect(document.cookie).toContain('eurofuelCookieConsent=false');
  });

  it('does not render when the consent cookie is already set', () => {
    document.cookie = 'eurofuelCookieConsent=true';
    render(<CustomCookieConsent />);
    expect(screen.queryByText(EN_MESSAGE)).not.toBeInTheDocument();
  });

  it('renders with Spanish translations when language is set to es', async () => {
    const { default: i18n } = await import('@/i18n');
    await act(async () => {
      await i18n.changeLanguage('es');
    });

    render(<CustomCookieConsent />);

    expect(
      screen.getByText(
        "Este sitio web utiliza cookies para mejorar la experiencia del usuario. Al hacer clic en 'Aceptar', das tu consentimiento para el uso de cookies. Puedes rechazar el uso de cookies haciendo clic en 'Rechazar'."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aceptar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rechazar' })).toBeInTheDocument();

    await act(async () => {
      await i18n.changeLanguage('en');
    });
  });
});
