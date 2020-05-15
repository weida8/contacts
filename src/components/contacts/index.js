import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useContactsApi from '../../hooks/useContactsApi';
import withHeader from '../header';
import ContactCard from '../../uiComponents/Card';
import AddContacts from './AddContact';
import SnackBar from '../../uiComponents/SnackBar';
import FilterField from '../../uiComponents/FilterField';

const containerStyles = makeStyles({
  root: {
    marginTop: '3vh',
  },
});

const Contacts = () => {
  const [filteredData, setFilteredData] = useState();
  const [{ data, isLoading, apiTrigger }, getContacts] = useContactsApi();
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [open, setOpen] = useState(false);

  const handleAddContactOpen = () => {
    setOpen(true);
  };

  const handleAddContactClose = (status) => {
    setOpen(false);
    if (status === 200) {
      setSnackBarState({
        open: true,
        message: 'New contact added!',
        severity: 'success',
      });
      getContacts(!apiTrigger);
    }
  };

  const handleFilterInput = (e) => {
    if (data) {
      const newData = data.filter((obj) => obj.name.includes(e.target.value));
      setFilteredData(newData);
    }
  };

  const containerClass = containerStyles();

  return (
    <Container className={containerClass.root}>
      <SnackBar
        open={snackBarState.open}
        onClose={() => setSnackBarState({
          open: false,
          message: '',
          severity: '',
        })}
        message={snackBarState.message}
        severity={snackBarState.severity}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Button variant="outlined" color="primary" onClick={handleAddContactOpen}>
            Add new contact
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FilterField handleFilterInput={handleFilterInput} />
        </Grid>
      </Grid>
      <AddContacts open={open} handleClose={handleAddContactClose} getContacts={getContacts} />
      <Grid container spacing={3}>
        {isLoading && <div>...loading</div>}
        {
          !isLoading && filteredData && filteredData.map((contact, id) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={id}>
              <ContactCard contact={contact} />
            </Grid>
          ))
        }
        {
          !isLoading && !filteredData && data && data.map((contact, id) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={id}>
              <ContactCard contact={contact} />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
};

export default withHeader(Contacts);
