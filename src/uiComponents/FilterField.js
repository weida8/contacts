import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function InputWithIcon(props) {
  const classes = useStyles();

  return (
    <form>
      <TextField
        className={classes.margin}
        name="filterField"
        label="Filter Contacts"
        text="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FilterListIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => props.handleFilterInput(e)}
      />
    </form>
  );
}
