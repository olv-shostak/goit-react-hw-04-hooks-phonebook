import { useState } from "react";
import { nanoid } from 'nanoid';
import { Form, FormLabel, InputField, FormButton } from "./ContactForm.styled";

function ContactForm({ enterSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

    // state = {
    //     name: '',
    //     number: ''
    //   };

    const createContact = (name, number) => {
        return { id: nanoid(4), name, number };
      };

    const handleOnChange = event => {
        const { name, value } = event.currentTarget;
        switch (name) {
          case 'name':
            setName(value);
            break;
          case 'number':
            setNumber(value);
            break;
          default:
            break;
        }
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newContact = createContact(name, number);
        enterSubmit(newContact);
        setName('');
        setNumber('');
      }


        return (
            <Form onSubmit={handleSubmit}>
          <FormLabel>
            Name
            <InputField
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              autoComplete="off"
              value={name}
              onChange={handleOnChange}
            />
          </FormLabel>
          <FormLabel>
            Phone
            <InputField
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              autoComplete='off'
              value={number}
              onChange={handleOnChange}
            />
          </FormLabel>
          <FormButton type="submit">Add contact</FormButton>
        </Form>
        )
    }

export default ContactForm;