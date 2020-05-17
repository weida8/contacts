import React, { useState, useEffect } from 'react';
import { useLocation, navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { removeCookie } from '../../util/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  const [buttonRoute, setButtonRoute] = useState(location.pathname.slice(1) === 'login' ? 'register' : 'login');

  const handleButtonClick = () => {
    if (location.pathname === '/login') {
      setButtonRoute('login');
      navigate('/register');
    } else if (location.pathname === '/register') {
      setButtonRoute('register');
      navigate('/login');
    } else {
      removeCookie('userToken');
      removeCookie('userName');
      navigate('/login');
    }
  };

  useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      setButtonRoute('logout');
    }
  }, [location.pathname]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Contacts
        </Typography>
        <Button color="inherit" onClick={handleButtonClick}>
          {buttonRoute}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const withHeader = (Page) => () => (
  <div>
    <Header />
    <Page />
  </div>
);

export default withHeader;
