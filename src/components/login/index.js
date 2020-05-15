import React, {useState} from 'react';
import axios from 'axios'
import { useLocation, navigate } from "@reach/router"
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import withHeader from '../header'
import {setCookie} from '../../util/auth'

const containerStyles = makeStyles({
  root: {
    marginTop: '30vh',
    display: 'flex',
    width: 'max-content'
  }
})
const cardStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 275,
    maxWidth: 700,
  },
  cardContent: {
    width:300,
    alignSelf: 'center',
  },
  body2: {
  },
  spacing: {
    flexDirection: 'row-reverse',
  }
});

const Login = () => {
  const cardClasses = cardStyles();
  const containerClasses = containerStyles();
  const location = useLocation();
  const [loginState, setLoginState] = useState({
    userName: '',
    password: '',
  })
  const [error, setError] = useState();

  const handleLogin = () => {
      axios.post('/authentication/login', {
        userName: loginState.userName,
        password: loginState.password,
        hostname: location.hostname
      }).then(response => {
        console.log(response.data)
        if(response.data.token) {
          setCookie('userToken', response.data.token)
          setCookie('userName', response.data.userName)
          navigate('/contacts')
        }
      })
      .catch(error => {
        setError(error.response.data)
      })
    }

  return (
    <Container className={containerClasses.root}>
    <Card className={cardClasses.root}>
      <CardContent className={cardClasses.cardContent}>
        <Typography variant='h6'>Log In To See All Users</Typography>
          {error && <Alert variant='outlined' severity='error'>
            {error.message}
          </Alert>}
        <div style={{margin: '30px 0'}}>
          <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={loginState.userName}
          onChange={e=>setLoginState({...loginState, userName: e.target.value})}
          />
      </div>
        <TextField
          id="outlined-helperText"
          label="Password"
          type="password"
          variant="outlined"
          value={loginState.password}
          onChange={e=>setLoginState({...loginState, password: e.target.value})}
          />
      </CardContent>
      <CardActions className={cardClasses.spacing}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleLogin}
          >
          Log In
        </Button>
      </CardActions>
    </Card>
  </Container>
  );
}

export default withHeader(Login);
