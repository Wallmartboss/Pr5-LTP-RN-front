import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { register } from '../../redux/auth/operations';
import s from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, options) => {
    dispatch(register(values));
    options.resetForm();
  };

  return (
    <div className={s.form}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <Form>
          <Field
            className={s.label}
            name="name"
            placeholder="Enter your name"
            required
          />
          <Field
            className={s.label}
            name="email"
            placeholder="Enter your email"
            required
          />
          <Field
            className={s.label}
            name="password"
            placeholder="Enter your password"
            required
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
