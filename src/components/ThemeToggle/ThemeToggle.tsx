import { useTranslation } from 'react-i18next';

import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import { IconButton, Tooltip } from '@mui/material';

import { useTheme } from '@/ui/theme/ThemeContext';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Tooltip title={t('components.navbar.changeTheme')} data-testid="theme-toggle">
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
