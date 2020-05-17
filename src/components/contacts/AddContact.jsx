// @flow
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import addContactApi from '../../api/contacts';
import { getCookie } from '../../util/auth';

type PhoneNumberFormatterType = {
  onChange: Function,
  inputRef: Function,
}

const PhoneNumberFormatter = (props: PhoneNumberFormatterType) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="(###) ###-####"
      isNumericString
    />
  );
};

type AddContactProps = {
  open: boolean,
  handleClose: Function
}
const AddContact = (props: AddContactProps) => {
  const { open, handleClose } = props;
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    title: '',
  });

  const handleAddContact = () => {
    const payload = {
      token: getCookie('userToken'),
      userName: getCookie('userName'),
      contact: {
        name: contactForm.name,
        phone: contactForm.phone,
        email: contactForm.email,
        city: contactForm.city,
        title: contactForm.title,
      },
    };
    addContactApi(payload)
      .then((response) => {
        if (response.status === 200) {
          handleClose(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFieldChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <form>
        <DialogContent>
          <DialogContentText>
            Fill in the following form to add a new contact.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            label="Phone Number"
            type="tel"
            onChange={handleFieldChange}
            fullWidth
            InputProps={{
              inputComponent: PhoneNumberFormatter,
            }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            onChange={handleFieldChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            onChange={handleFieldChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddContact} color="primary" disabled={contactForm.name.trim() === ''}>
            add contact
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddContact;
