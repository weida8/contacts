import axios from 'axios';

const addContactApi = async (payload) => {
  const response = await axios.post('/contacts/addContacts', payload);
  return response;
};

export default addContactApi;
