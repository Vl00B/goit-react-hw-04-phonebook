import { useState } from 'react';
import s from './ContactForm.module.css';

import { PropTypes } from 'prop-types';

export const ContactForm = ({ onSubmitForm }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetState = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmitForm({ name, number });
    resetState();
  };

  return (
    <form onSubmit={handleSubmit} className={`${s.phonebook} container`}>
      <h1 className="title">Phonebook</h1>
      <label>
        <span className={s.contact_property}>Name</span>
        <input
          autoComplete="off"
          type="text"
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        <span className={s.contact_property}>Number</span>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={event => setNumber(event.target.value)}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <label className={s.submit_label}>
        <button type="submit">Add contact</button>
      </label>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
