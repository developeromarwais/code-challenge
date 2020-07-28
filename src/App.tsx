import React, { useState } from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';
import { Switch, FormControlLabel } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from './routes';
import apollo from './config/Apollo';


function App() {
  const [darkMode, setDarkMode] = useState(false)
  const darkTheme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApolloProvider client={apollo}>
        <FormControlLabel
          control={
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
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
