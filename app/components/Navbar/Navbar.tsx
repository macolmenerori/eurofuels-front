import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import i18n from '@/i18n';
import { useThemeMode } from '@/ui/ThemeModeProvider';

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.map', end: true },
  { to: '/stats', labelKey: 'nav.stats', end: false },
  { to: '/about', labelKey: 'nav.about', end: false }
] as const;

export function Navbar(): React.JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();

  const currentLang = i18n.resolvedLanguage ?? 'en';

  function handleLangChange(event: SelectChangeEvent): void {
    void i18n.changeLanguage(event.target.value);
  }

  return (
    <Box
      component="nav"
      sx={{
        height: 64,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        pl: 6,
        pr: 6,
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Brand wordmark */}
      <Box
        component={NavLink}
        to="/"
        end
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          textDecoration: 'none',
          '&:hover': { opacity: 0.85 },
          transition: 'opacity 160ms ease'
        }}
      >
        <Typography variant="brandWordmark" component="span">
          <Box component="span" sx={{ color: 'text.primary' }}>
            Euro
          </Box>
          <Box component="span" sx={{ color: 'accent.main' }}>
            Fuels
          </Box>
        </Typography>
        <Typography
          variant="brandTagline"
          component="span"
          sx={{ color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.06em' }}
        >
          EU PRICE TRACKER
        </Typography>
      </Box>

      {/* 32px gap then nav links */}
      <Box sx={{ width: 32, flexShrink: 0 }} />
      <Box component="ul" sx={{ display: 'flex', gap: 1, m: 0, p: 0, listStyle: 'none' }}>
        {NAV_LINKS.map(({ to, labelKey, end }) => (
          <Box key={to} component="li">
            <Box
              component={NavLink}
              to={to}
              end={end}
              sx={{
                display: 'block',
                px: '14px',
                py: '8px',
                borderRadius: `${theme.ef.radii.md}px`,
                color: 'text.secondary',
                textDecoration: 'none',
                position: 'relative',
                ...theme.typography.bodyMd,
                transition: 'color 160ms ease, background-color 160ms ease',
                '&:hover': {
                  bgcolor: theme.ef.primaryFaded
                },
                '&.active': {
                  color: 'text.primary',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: '14px',
                    right: '14px',
                    bottom: '-1px',
                    height: '2px',
                    borderRadius: '1px',
                    bgcolor: 'accent.main'
                  }
                }
              }}
            >
              {t(labelKey)}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Flex spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Language selector */}
      <Select
        value={currentLang}
        onChange={handleLangChange}
        size="small"
        variant="outlined"
        inputProps={{ 'aria-label': 'Language' }}
        sx={{
          color: 'text.primary',
          bgcolor: 'transparent',
          borderRadius: `${theme.ef.radii.md}px`,
          ...theme.typography.numericSm,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider
          },
          '& .MuiSelect-select': {
            py: '8px',
            px: '12px'
          }
        }}
      >
        <MenuItem value="en">
          <Typography variant="numericSm" component="span">
            EN
          </Typography>
        </MenuItem>
        <MenuItem value="es">
          <Typography variant="numericSm" component="span">
            ES
          </Typography>
        </MenuItem>
      </Select>

      {/* 8px gap then theme switch */}
      <Box sx={{ width: 8, flexShrink: 0 }} />
      <ThemeSwitch
        enableDarkMode={mode === 'dark'}
        setEnableDarkMode={(v) => setMode(v ? 'dark' : 'light')}
        size="small"
      />
    </Box>
  );
}
