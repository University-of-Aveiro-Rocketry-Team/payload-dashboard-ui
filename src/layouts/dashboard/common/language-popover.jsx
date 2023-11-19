import IconButton from '@mui/material/IconButton';

import { useTheme } from 'src/theme';

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/ic_flag_de.svg',
  }
];


export default function LanguagePopover() {
  const { toggleTheme } = useTheme();


  return (
      <IconButton
        onClick={toggleTheme}
        sx={{
          width: 40,
          height: 40,
          ...({
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>
  );
}
