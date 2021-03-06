// @flow
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

type CustomizedSnackbarsProps = {
  open: boolean,
  message: string,
  severity: string,
  onClose: Function
}
export default function CustomizedSnackbars(props: CustomizedSnackbarsProps) {
  const classes = useStyles();
  const {
    open, message, severity, onClose,
  } = props;

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
