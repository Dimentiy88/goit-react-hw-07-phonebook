import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://65425e3df0b8287df1000232.mockapi.io/',
});

export const fetchContacts = async () => {
  const { data } = await contactsInstance.get('/contacts');
  return data;
};

export const addContact = async newContact => {
  const { data } = await contactsInstance.post('/contacts', newContact);
  return data;
};

export const deleteContact = async contactId => {
  const { data } = await contactsInstance.delete(`/contacts/${contactId}`);
  return data;
};
