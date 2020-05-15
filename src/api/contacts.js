import axios from 'axios';

export const addContactApi = async (payload) => {
  const response = await axios.post('/contacts/addContacts', payload)
  return response;
}
