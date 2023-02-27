import { useState, useEffect } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './ContactFilter/ContactFilter';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';

const initialContacts = JSON.parse(localStorage.getItem('contactList')) || [
  { name: 'Rosie Simpson', number: '459-12-56', id: nanoid() },
  { name: 'Hermione Kline', number: '443-89-12', id: nanoid() },
  { name: 'Eden Clements', number: '645-17-79', id: nanoid() },
  { name: 'Annie Copeland', number: '227-91-26', id: nanoid() },
];

export const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  const toAddContact = data => {
    const newContact = {
      name: data.name,
      number: data.number,
      id: nanoid(),
    };

    if (
      contacts.find(
        element =>
          element.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim()
      )
    ) {
      alert('There is already contact with this name.');
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const toRemoveContact = contactID => {
    setContacts(contacts.filter(contact => contactID !== contact.id));
  };

  const onFilter = () => {
    if (filter) {
      return contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.number.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return contacts;
    }
  };

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <ContactForm onSubmitForm={toAddContact} />

      {contacts.length ? (
        <ContactsList
          contacts={onFilter()}
          children={
            <Filter
              toFilterContacts={event => {
                setFilter(event.target.value);
              }}
              filter={filter}
            />
          }
          deleteContact={toRemoveContact}
        />
      ) : (
        <div className="container">
          <h2>There are no contacts yet.</h2>
        </div>
      )}
    </>
  );
};
