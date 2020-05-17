import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import withHeader from '../header';
import { userRegistrationApi } from '../../api/authentication';
import PhoneNumberFormatter from '../../uiComponents/TextFields';

const containerStyles = makeStyles({
  root: {
    marginTop: '30vh',
    display: 'flex',
    width: 'max-content',
  },
});
const cardStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 275,
    width: '50vh',
    maxWidth: 700,
  },
  cardContent: {
    alignSelf: 'center',
  },
  body2: {
  },
  spacing: {
    flexDirection: 'row-reverse',
  },
});

const Register = () => {
  const cardClasses = cardStyles();
  const containerClasses = containerStyles();
  const [registerState, setRegisterState] = useState({
    userName: '',
    password: '',
    email: '',
    title: '',
    phoneNumber: '',
  });
  const [registrationSucceeded, setRegistrationSucceeded] = useState();
  const [error, setError] = useState();

  const handleRegister = () => {
    const payload = {
      userName: registerState.userName,
      password: registerState.password,
      email: registerState.email,
      title: registerState.title,
      phoneNumber: registerState.phoneNumber,
    };
    userRegistrationApi(payload).then((response) => {
      if (response.data.status === 200) {
        setRegistrationSucceeded(true);
        navigate('/login');
      }
    })
      .catch((registrationError) => {
        setError(registrationError.response.data);
      });
  };

  return (
    <Container className={containerClasses.root}>
      <Card className={cardClasses.root}>
        <CardContent className={cardClasses.cardContent}>
          <Typography variant="h6">Register</Typography>
          {error && (
          <Alert variant="outlined" severity="error">
            {error.message}
          </Alert>
          )}
          {registrationSucceeded
          && (
          <Alert variant="outlined" severity="success">
            Registration Succeeded! Click
            <Link to="/login">here</Link>
            {' '}
            to log in.
          </Alert>
          )}
          <div style={{ margin: '30px 0' }}>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={registerState.userName}
              onChange={(e) => setRegisterState({ ...registerState, userName: e.target.value })}
            />
          </div>
          <div style={{ margin: '30px 0' }}>
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              value={registerState.email}
              onChange={(e) => setRegisterState({ ...registerState, email: e.target.value })}
            />
          </div>
          <div style={{ margin: '30px 0' }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="phone"
              label="Phone Number"
              type="tel"
              onChange={(e) => setRegisterState({ ...registerState, phoneNumber: e.target.value })}
              autoComplete="off"
              InputProps={{
                inputComponent: PhoneNumberFormatter,
              }}
            />
          </div>
          <div style={{ margin: '30px 0' }}>
            <TextField
              id="outlined-basic"
              label="title"
              variant="outlined"
              value={registerState.title}
              onChange={(e) => setRegisterState({ ...registerState, title: e.target.value })}
            />
          </div>
          <TextField
            id="outlined-helperText"
            label="Password"
            type="password"
            variant="outlined"
            value={registerState.password}
            onChange={(e) => setRegisterState({ ...registerState, password: e.target.value })}
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
};

export default withHeader(Register);
