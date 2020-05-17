import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../util/auth';

const useContactsApi = () => {
  const [data, setData] = useState();
  const [apiTrigger, setApiTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsLoading(true);
      try {
        const contactsPayload = {
          hostname: 'localhost',
          token: getCookie('userToken'),
          userName: getCookie('userName'),
        };
        console.log(contactsPayload);
        const response = await axios.post('/contacts/getContacts', contactsPayload);
        console.log(response.data.data.contactList);
        setData(response.data.data.contactList);
      } catch (contactsError) {
        setError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [apiTrigger]);

  return [{
    data, isLoading, error, apiTrigger,
  }, setApiTrigger];
};

export default useContactsApi;
