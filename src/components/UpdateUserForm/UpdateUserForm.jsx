import * as yup from 'yup';
import s from './UpdateUserForm.module.css';
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { updateUser } from '../../redux/user/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail, selectUserName } from '../../redux/user/selectors.js';
import toast, { Toaster } from 'react-hot-toast';

const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name can be up to 32 characters'),
  email: yup.string().email('Invalid email format'),
  //   password: yup
  //     .string()
  //     .min(8, 'Password must be at least 8 characters')
  //     .max(64, 'Password can be up to 64 characters'),
});
export default function App() {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFieldValue('image', file);
    }
  };

  const handleSubmit = async values => {
    //   setIsLoading(true);
    if (values.email.length == 0 && values.name.length == 0) {
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    // formData.append('password', values.password);

    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      await dispatch(updateUser(formData));
      toast.success('Successfully updated!');
    } catch (error) {
      console.log(error);
      toast.error('Error!');
    } finally {
      // s
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          image: '',
          name: userName,
          email: userEmail,
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={updateUserSchema}
      >
        {({ setFieldValue }) => (
          <Form className={s.form}>
            <div className={s.img_wrapper}>
              <img
                className={s.img}
                src={image || './icons/icon.svg'}
                alt="Profile"
              />
              <label htmlFor="file-upload" className={s.custom_file_upload}>
                <svg
                  className={s.upload_icon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                >
                  <path
                    d="M5 2.0835V7.91683"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.08331 5H7.91665"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input
                onChange={event => handleImageUpload(event, setFieldValue)}
                id="file-upload"
                type="file"
                className={s.file_upload}
              />
            </div>
            <Field
              className={s.field}
              type="text"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage className={s.error} name="name" component="span" />
            <Field
              placeholder="ivetta34@gmail.com"
              className={s.field}
              type="email"
              name="email"
            />
            <ErrorMessage className={s.error} name="email" component="span" />
            {/* <Field
            className={s.field}
            placeholder="ivetta1999.23"
            type="password"
            name="password"
          />
          <ErrorMessage className={s.error} name="password" component="span" /> */}
            <button className={s.send_button} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
      <Toaster />
    </>
  );
}
