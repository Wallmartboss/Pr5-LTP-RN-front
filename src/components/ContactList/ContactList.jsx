import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/slice';
import s from './ContactList.module.css';
import Contact from '../Contact/Contact';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul>
      {contacts.map(item => (
        <li key={item.id} className={s.list}>
          <Contact item={item} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
