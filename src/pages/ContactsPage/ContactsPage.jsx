import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import DocumentTitle from '../../components/DocumentTitle';
import ContactList from '../../components/ContactList/ContactList';
import ContactsForm from '../../components/ContactsForm/ContactsForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1> Contact book </h1>
      <ContactsForm />
      <SearchBox />
      {loading && !error && <p>Request in progress...</p>}
      <ContactList />
    </div>
  );
};
export default ContactsPage;
