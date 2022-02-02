import { useState, useEffect } from 'react';
import { Container, Section, Title, TitleContacts } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // const parseContacts = JSON.parse(localStorage.getItem('contacts'));
    // if (parseContacts) {
    //   setContacts({ contacts: parseContacts });
    // }
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    parseContacts !== null && setContacts(parseContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const findContact = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const addContact = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts(prevState => [data, ...prevState]);
    }
  };

  const handlChange = e => {
    setFilter(e.currentTarget.value);
  };

  const clearFilterInput = () => {
    setFilter('');
  };

  return (
    <Container>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm enterSubmit={addContact}></ContactForm>
      </Section>
      <Section>
        <TitleContacts>Contacts</TitleContacts>
        {contacts.length === 0 ? (
          <Notification message="There is no any contact"></Notification>
        ) : (
          <Filter filter={filter} onChange={handlChange} clear={clearFilterInput} />
        )}
        <ContactList find={findContact()} deleteContact={deleteContact}></ContactList>
      </Section>
    </Container>
  );
}

export default App;
