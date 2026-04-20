import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function HeaderComponent() {
  const { t } = useTranslation();
  return (
    <Stack
      spacing={2}
      sx={{
        marginBottom: 4
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: 'center'
        }}
      >
        {t('mainPage.title')}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: 'text.tertiary',
          fontStyle: 'italic'
        }}
      >
        {t('mainPage.description')}
      </Typography>
    </Stack>
  );
}
