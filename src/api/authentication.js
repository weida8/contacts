import axios from 'axios';

export const userLoginApi = async (payload) => {
  const response = await axios.post('authentication/login', payload);
  return response;
};

export const userRegistrationApi = async (payload) => {
  const response = await axios.post('authentication/register', payload);
  return response;
};
