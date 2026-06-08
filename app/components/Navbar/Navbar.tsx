import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';
import CheckIcon from '@mui/icons-material/Check';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
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

const LANGS = ['en', 'es'] as const;

export function Navbar(): React.JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();

  const currentLang = i18n.resolvedLanguage ?? 'en';

  // Mobile menu state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  function handleMenuOpen(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose(): void {
    setAnchorEl(null);
  }

  // Shared lang change logic — used by both desktop Select and mobile rows
  function changeLang(lang: string): void {
    void i18n.changeLanguage(lang);
  }

  function handleLangChange(event: SelectChangeEvent): void {
    changeLang(event.target.value);
  }

  return (
    <>
      <Box
        component="nav"
        sx={{
          height: 64,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          pl: { xs: 4, sm: 6 },
          pr: { xs: 4, sm: 6 },
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        {/* Brand wordmark — always rendered, single instance */}
        <Box
          component={NavLink}
          to="/"
          end
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            '&:hover': { opacity: 0.85 },
            transition: 'opacity 160ms ease'
          }}
        >
          <Box
            component="img"
            src="/icons/favicon.webp"
            alt="EuroFuels logo"
            sx={{ width: 40, height: 40, flexShrink: 0, display: 'block' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
        </Box>

        {/* Desktop region — hidden below sm */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flex: 1,
            alignItems: 'center'
          }}
        >
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

        {/* Mobile region — hidden at sm and above */}
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <IconButton
            onClick={handleMenuOpen}
            aria-label={t('nav.openMenu')}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            aria-controls={menuOpen ? 'mobile-nav-menu' : undefined}
            sx={{ color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile dropdown menu */}
      <Menu
        id="mobile-nav-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'background.paper',
              border: `1px solid ${theme.ef.borderStrong}`,
              borderRadius: `${theme.ef.radii.md}px`,
              minWidth: 180,
              mt: '4px'
            }
          }
        }}
      >
        {/* Nav links */}
        {NAV_LINKS.map(({ to, labelKey, end }) => (
          <MenuItem
            key={to}
            component={NavLink}
            to={to}
            end={end}
            onClick={handleMenuClose}
            sx={{
              ...theme.typography.bodyMd,
              color: 'text.secondary',
              '&.active': {
                color: 'accent.main'
              }
            }}
          >
            {t(labelKey)}
          </MenuItem>
        ))}

        <Divider sx={{ my: 0.5 }} />

        {/* Language rows */}
        {LANGS.map((lang) => {
          const isActive = currentLang === lang;
          return (
            <MenuItem
              key={lang}
              onClick={() => {
                changeLang(lang);
                handleMenuClose();
              }}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: isActive ? 'accent.main' : 'text.secondary'
              }}
            >
              <Typography variant="numericSm" component="span">
                {lang.toUpperCase()}
              </Typography>
              {isActive && (
                <CheckIcon
                  fontSize="small"
                  sx={{ color: 'accent.main', ml: 1, fontSize: '1rem' }}
                />
              )}
            </MenuItem>
          );
        })}

        <Divider sx={{ my: 0.5 }} />

        {/* Theme switch row — does not close the menu */}
        <MenuItem
          disableRipple
          onClick={(e) => e.stopPropagation()}
          sx={{ justifyContent: 'space-between', cursor: 'default' }}
        >
          <ThemeSwitch
            enableDarkMode={mode === 'dark'}
            setEnableDarkMode={(v) => setMode(v ? 'dark' : 'light')}
            size="small"
          />
        </MenuItem>
      </Menu>
    </>
  );
}
