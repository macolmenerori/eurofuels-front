import { useTranslation } from 'react-i18next';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { palette } = useTheme();

  const backgroundColor = palette.background.default;

  function handleLanguageChange(event: SelectChangeEvent) {
    const language = event.target.value;
    i18n.changeLanguage(language);
  }

  return (
    <FormControl size="small" sx={{ minWidth: 60 }} data-testid="language-switcher">
      <Tooltip title={t('components.navbar.changeLanguage')} placement="left" arrow>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          displayEmpty
          variant="outlined"
          sx={{ backgroundColor: { backgroundColor } }}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="es">ES</MenuItem>
        </Select>
      </Tooltip>
    </FormControl>
  );
}
