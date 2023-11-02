import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

const INITIAL_STATE = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  reducers: {
    onFilterChange: (state, action) => {
      state.filter = action.payload;
    },
  },

  // ! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  extraReducers: builder =>
    builder
      .addCase(requestContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(requestContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(requestContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })

      // ! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

      .addCase(requestAddContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(requestAddContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = [action.payload, ...state.contacts.items];
      })
      .addCase(requestAddContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })

      // ! -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

      .addCase(requestDeleteContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(requestDeleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(requestDeleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      }),
});

export const contactsReducer = contactsSlice.reducer;
export const { onFilterChange } = contactsSlice.actions;
