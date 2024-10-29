import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { login } from '../../redux/auth/operations';
import s from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, options) => {
    dispatch(login(values));
    options.resetForm();
  };

  return (
    <div className={s.form}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <Form>
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
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </div>
  );
};
export default LoginForm;
