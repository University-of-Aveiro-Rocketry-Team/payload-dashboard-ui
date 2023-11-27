import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';


const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const what_theme = useTheme();

  const logo = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src="/public/favicon/logo.png" alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" color={what_theme.palette.text.primary}>
          UART - Payload
        </Typography>
      </Box>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents', color: '#212B36' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
