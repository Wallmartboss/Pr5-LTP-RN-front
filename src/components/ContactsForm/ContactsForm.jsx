import { Field, Form, Formik } from 'formik';
import s from './ContactsForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

const ContactsForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, options) => {
    dispatch(addContact(values));
    options.resetForm();
  };
  return (
    <div className={s.addFormWrapper}>
      <Formik initialValues={{ name: '', number: '' }} onSubmit={onSubmit}>
        <Form>
          <Field
            className={s.input}
            name="name"
            placeholder="Enter new contact"
            required
          />
          <Field
            className={s.input}
            name="number"
            placeholder="Enter contact's number"
            required
          />
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </div>
  );
};
export default ContactsForm;
