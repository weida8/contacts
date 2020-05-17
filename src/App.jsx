import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import configureStore from './redux/configureStore';
import Routes from './routes';
import './styles.css';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store} className="App">
      <CssBaseline />
      <Routes />
    </Provider>
  );
}
