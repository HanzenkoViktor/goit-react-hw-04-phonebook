import { useState, useEffect } from 'react';
import { AppStyled } from './App.styled';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactsList from './ContactsList';

const shortid = require('shortid');

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const addContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    setContacts(prevState => [addContact, ...prevState]);
    return true;
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <AppStyled>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <Filter value={filter} onChengeFilter={changeFilter} />
      <ContactsList contacts={visibleContacts} deleteContact={deleteContact} />
    </AppStyled>
  );
};

export default App;
