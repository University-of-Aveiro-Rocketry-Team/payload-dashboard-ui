import IconButton from '@mui/material/IconButton';

import { useTheme } from 'src/theme';

const LANGS = [
  {
    label: 'Light Mode',
    icon: '/assets/icons/img_mode_light.png',
  },
  {
    label: 'Dark Mode',
    icon: '/assets/icons/img_mode_dark.png',
  }
];
let index = 1;


export default function ThemePopover() {
  const { toggleTheme } = useTheme();

  return (
      <IconButton
        onClick={ () => {
          toggleTheme();
          index = (index + 1) % LANGS.length;
          }
        }
        sx={{
          width: 40,
          height: 40,
          ...({
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img src={LANGS[index].icon} alt={LANGS[index].label} />
      </IconButton>
  );
}
