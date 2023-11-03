import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from 'services/api';

export const requestContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contactsData = await fetchContacts();
      return contactsData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

export const requestAddContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const contact = await addContact(newContact);
      console.log(contact);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

export const requestDeleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const delContact = await deleteContact(id);
      console.log(delContact);
      return delContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
