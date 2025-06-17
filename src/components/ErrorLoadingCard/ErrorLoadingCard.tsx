import { useTranslation } from 'react-i18next';

import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';

interface ErrorLoadingCardProps {
  title: string;
  message: string;
  showReload: boolean;
}

/**
 * Error card.
 *
 * @param {string} title - The title to show in the card.
 * @param {string} message - The message to show in the card.
 * @param {boolean} showReload - Wether show the reload button or not.
 */
export default function ErrorLoadingCard({ title, message, showReload }: ErrorLoadingCardProps) {
  const { t } = useTranslation();
  return (
    <Card sx={{ width: 360, margin: 'auto' }} data-testid="error-loading-card">
      <CardContent>
        <Stack spacing={2}>
          <Typography textAlign="center" variant="h3">
            ⚠️ {title}
          </Typography>
          <Typography textAlign="center" variant="body2">
            {message}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifySelf: 'center', paddingBottom: 2 }}>
        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          {showReload && (
            <Button onClick={() => window.location.reload()}>
              <Typography>{t('components.errorLoadingCard.reload')}</Typography>
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
