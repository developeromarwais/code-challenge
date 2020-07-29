import React, { useState, MouseEvent } from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';
import { Switch, FormControlLabel } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from './routes';
import useDarkMode from './config/Theme';
import apollo from './config/Apollo';


function App() {
  // const [darkMode, setDarkMode] = useState(false)
  const [theme, toggleDarkMode] = useDarkMode()
  const darkTheme = createMuiTheme({
    palette: {
      type: theme ? 'dark' : 'light'
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApolloProvider client={apollo}>
        <FormControlLabel
          control={
            <Switch checked={theme ? true : false} onClick={() => toggleDarkMode(theme ? false : true)} />
          }
          label="Light Switch"
          style={{ margin: '40px' }}
        />
        <Router />
      </ApolloProvider>
    </ThemeProvider>
  )

}

export default App;
