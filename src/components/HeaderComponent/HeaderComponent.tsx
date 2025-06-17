import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

export default function HeaderComponent() {
  const { t } = useTranslation();
  return (
    <Stack spacing={2} marginBottom={4}>
      <Typography variant="h1" textAlign="center">
        {t('mainPage.title')}
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.tertiary" fontStyle="italic">
        {t('mainPage.description')}
      </Typography>
    </Stack>
  );
}
