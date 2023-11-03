import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { requestDeleteContact } from 'redux/thunks';
import { selectContacts, selectFilterValue } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilterValue);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(filter?.toLowerCase())
  );

  const handleDelete = contactId => {
    dispatch(requestDeleteContact(contactId));
  };

  return (
    <div className={css.wraperContactList}>
      <ul className={css.contactList}>
        {filteredContacts.map(contact => (
          <li key={contact.id} className={css.contactListItem}>
            {contact.name}: {contact.phone}
            <button
              type="button"
              className={css.contactListItemBtn}
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
