import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import s from './Contact.module.css';
import { Toaster } from 'react-hot-toast';

const Contact = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.item}>
      <p className={s.name}>{item.name}</p>
      <p className={s.name}>{item.number}</p>
      <button
        className={s.btn}
        onClick={() => dispatch(deleteContact(item.id))}
      >
        Delete
      </button>
      <Toaster />
    </div>
  );
};

export default Contact;
