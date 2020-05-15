import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    marginTop: 30,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ContactCard(props) {
  const classes = useStyles();

  const {name, phone, title, email, city} = props.contact

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {email}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {phone}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {city}
        </Typography>
      </CardContent>
    </Card>
  );
}
