import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import * as theme from './styleConfig/index'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
