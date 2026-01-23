import { useTranslation } from 'react-i18next';

import { ThemeSwitch } from '@macolmenerori/component-library/theme-switch';
import { Tooltip } from '@mui/material';

import { useTheme } from '@/ui/theme/ThemeContext';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSetEnableDarkMode = (_value: boolean) => {
    toggleTheme();
  };

  return (
    <Tooltip title={t('components.navbar.changeTheme')} data-testid="theme-toggle">
      <div>
        <ThemeSwitch
          enableDarkMode={mode === 'dark'}
          setEnableDarkMode={handleSetEnableDarkMode}
          size="small"
        />
      </div>
    </Tooltip>
  );
}

export default ThemeToggle;
