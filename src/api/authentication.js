import axios from 'axios';

export const userLoginApi = (payload) => {
  axios.post('authentication/login', payload)
    .then(reponse => {
      return response
    })
    .catch(error => {
      return error
    })
}

export const userRegistrationApi = (payload) => {
  axios.post('/authentication/register', payload)
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
}
