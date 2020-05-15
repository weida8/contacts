import React, {useState} from 'react';
import axios from 'axios'
import { Link, navigate } from "@reach/router"
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

const Register = () => {
  const cardClasses = cardStyles();
  const [registerState, setRegisterState] = useState({
    userName: '',
    password: '',
  })
  const [registrationSucceeded, setRegistrationSucceeded] = useState()
  const [error, setError] = useState();

  const handleRegister = () => {
      axios.post('/authentication/register', {
        userName: registerState.userName,
        password: registerState.password
      }).then(response => {
        console.log(response.data)
        console.log(response.data.status)

        if(response.data.status === 200) {
          setRegistrationSucceeded(true);
          navigate('/login')
        }
      })
      .catch(error => {
        setError(error.response.data)
      })
    }

  return (
    <Container fixed style={{paddingTop: '30vh'}}>
    <Card className={cardClasses.root}>
      <CardContent className={cardClasses.cardContent}>
        <Typography variant='h6'>Register</Typography>
        {error && <Alert variant='outlined' severity='error'>
          {error.message}
        </Alert>}
        {registrationSucceeded &&
          <Alert variant='outlined' severity='success'>Registration Succeeded! Click <Link to='/login'>here</Link> to log in.</Alert>}
        <div style={{margin: '30px 0'}}>
          <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={registerState.userName}
          onChange={e=>setRegisterState({...registerState, userName: e.target.value})}
          />
      </div>
        <TextField
          id="outlined-helperText"
          label="Password"
          type="password"
          variant="outlined"
          value={registerState.password}
          onChange={e=>setRegisterState({...registerState, password: e.target.value})}
          />
      </CardContent>
      <CardActions className={cardClasses.spacing}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleRegister}
          >
          Register
        </Button>
      </CardActions>
    </Card>
  </Container>
  );
}

export default withHeader(Register);
