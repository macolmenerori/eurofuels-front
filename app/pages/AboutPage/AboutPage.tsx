import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MetaFunction } from 'react-router';

import { Box, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { buildMeta } from '@/lib/seo';

const BACKEND_REPO_URL = 'https://github.com/macolmenerori/eurofuels-back';
const FRONTEND_REPO_URL = 'https://github.com/macolmenerori/eurofuels-front';
const AUTHOR_URL = 'https://miguelcolmenero.net';

export const meta: MetaFunction = () =>
  buildMeta({
    path: '/about',
    title: 'About – EuroFuels',
    description: 'About the EuroFuels project.'
  });

export default function AboutPage(): React.JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(6)
      }}
    >
      <Box sx={{ maxWidth: 680, mx: 'auto', width: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ mb: theme.spacing(4), textAlign: 'center' }}>
          {t('about.title')}
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mb: theme.spacing(1) }}>
          {t('about.project.heading')}
        </Typography>
        <Typography variant="bodyMd" sx={{ mb: theme.spacing(5) }}>
          {t('about.project.body')}
        </Typography>

        <Typography variant="h6" component="h2" sx={{ mb: theme.spacing(1) }}>
          {t('about.data.heading')}
        </Typography>
        <Typography variant="bodyMd" sx={{ mb: theme.spacing(1) }}>
          {t('about.data.body')}
        </Typography>
        <Typography variant="bodyMd" sx={{ mb: theme.spacing(6) }}>
          <Link
            href={BACKEND_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'accent.main' }}
          >
            {t('about.data.repoLink')}
          </Link>
        </Typography>

        <Typography variant="bodySm" color="text.secondary">
          {t('about.credit.madeBy')}{' '}
          <Link
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'accent.main' }}
          >
            {t('about.credit.author')}
          </Link>
          {' · '}
          <Link
            href={FRONTEND_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'accent.main' }}
          >
            {t('about.credit.sourceCode')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
