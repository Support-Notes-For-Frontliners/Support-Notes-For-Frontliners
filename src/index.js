import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles/'
import theme from './theme.js';
import { BrowserRouter } from "react-router-dom";
import FirebaseContext from './assets/components/FireBase/FireBaseContext';
import FireBase from './assets/components/FireBase/FireBase'

ReactDOM.render(
  <BrowserRouter>
  <FirebaseContext.Provider value={new FireBase()}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </FirebaseContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
