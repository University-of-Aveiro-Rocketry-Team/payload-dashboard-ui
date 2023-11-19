import PropTypes from 'prop-types';
import React, { useMemo, useState, useContext, useCallback, createContext } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { palette, darkPalette } from './palette';
import { customShadows } from './custom-shadows';


const ThemeContext = createContext(); // Define ThemeContext

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  // Wrap toggleTheme in useCallback
  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  // Wrap contextValue in useMemo
  const contextValue = useMemo(() => ({ toggleTheme }), [toggleTheme]);

  const memoizedValue = useMemo(
    () => ({
      palette: mode === 'light' ? palette() : darkPalette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [mode]
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

// export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
  