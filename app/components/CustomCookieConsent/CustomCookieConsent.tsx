import { CookieConsent } from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

export function CustomCookieConsent(): React.JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CookieConsent
      location="bottom"
      cookieName="eurofuelCookieConsent"
      expires={150}
      enableDeclineButton
      disableButtonStyles
      ButtonComponent={Button}
      buttonText={t('cookies.accept')}
      declineButtonText={t('cookies.decline')}
      ariaAcceptLabel={t('cookies.accept')}
      ariaDeclineLabel={t('cookies.decline')}
      customButtonProps={{ variant: 'contained', color: 'primary', size: 'small' }}
      customDeclineButtonProps={{
        variant: 'outlined',
        size: 'small',
        sx: {
          borderColor: theme.palette.divider,
          color: theme.palette.text.secondary,
          '&:hover': {
            borderColor: theme.ef.borderStrong,
            backgroundColor: theme.ef.primaryFaded
          }
        }
      }}
      customButtonWrapperAttributes={{ style: { display: 'flex', gap: '8px' } }}
      style={{
        background: theme.ef.surfaceElevated,
        color: theme.palette.text.primary,
        borderTop: `1px solid ${theme.ef.borderStrong}`,
        boxShadow: '0 -1px 2px rgba(0, 0, 0, 0.4), 0 -16px 40px rgba(0, 0, 0, 0.5)',
        padding: '16px 24px',
        alignItems: 'center',
        fontFamily: theme.typography.fontFamily,
        fontSize: '0.875rem'
      }}
      contentStyle={{
        color: theme.palette.text.secondary,
        flex: '1 1 auto',
        margin: '0 16px 0 0'
      }}
    >
      {t('cookies.message')}
    </CookieConsent>
  );
}
