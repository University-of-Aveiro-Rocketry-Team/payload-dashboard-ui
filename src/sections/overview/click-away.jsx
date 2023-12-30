import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import HistoryGraph from './history-graph';
import DynamicAppWidget from './app-widget-dynamic';

export default function ClickAway({ title, subtitle,color, icon, who, sx, ...other }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  // Set the height and width to match other components
  const containerStylesPop = {
    position: 'fixed',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000, // Increase zIndex to ensure it's above other components
    border: 'none',
    p: 1,
    width: '75%',
    height: 'auto',
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <button
          type="button"
          onClick={handleClick}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            width: 'auto',
            height: 'auto',
          }}
        >
          <DynamicAppWidget
            title={title}
            color={color}
            who={who}
            icon={icon}
            {...other}
          />
        </button>
          {open ? (
              <Box sx={containerStylesPop}>
                <HistoryGraph
                  title={title}
                  subheader={subtitle}
                  color={[color]}
                  dataFilters={[who]}
                />
              </Box>
            ) : null}
      </Box>
    </ClickAwayListener>
  );
}

ClickAway.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  who: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
