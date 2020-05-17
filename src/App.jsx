import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes />
    </div>
  );
}
