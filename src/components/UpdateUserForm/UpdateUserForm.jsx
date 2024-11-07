import * as yup from 'yup';
import s from './UpdateUserForm.module.css';
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { updateUser } from '../../redux/user/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail, selectUserName } from '../../redux/user/selectors.js';
import toast from 'react-hot-toast';

const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name can be up to 32 characters'),
  email: yup.string().email('Invalid email format'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password can be up to 64 characters'),
});
export default function UpdateUserForm({ avatar, closeModal }) {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const [image, setImage] = useState(avatar);

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFieldValue('avatar', file);
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const handleSubmit = async values => {
    if (values.email.length == 0 && values.name.length == 0) {
      return;
    }
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    console.log(values);

    if (values.avatar) {
      formData.append('avatar', values.avatar);
    }

    try {
      await dispatch(updateUser(formData));
      toast.success('Successfully updated!');
      handleClose();
    } catch (error) {
      toast.error('Error!');
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          avatar: image,
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
              {image ? (
                <img className={s.avatar} src={image} alt="" />
              ) : (
                <div className={s.avatar_wrapper}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 68 68"
                    xmlns="http://www.w3.org/2000/svg"
                    className={s.avatar_icon}
                  >
                    <g clipPath="url(#clip0_4566_2575)">
                      <circle cx="34.3334" cy="31.3334" r="11.3334" />
                      <path d="M61.7529 69.8119C61.7529 66.1511 61.0319 62.5261 59.6309 59.144C58.23 55.7619 56.1766 52.6888 53.5881 50.1002C50.9995 47.5117 47.9264 45.4583 44.5443 44.0574C41.1622 42.6565 37.5372 41.9354 33.8764 41.9354C30.2157 41.9354 26.5907 42.6565 23.2086 44.0574C19.8265 45.4583 16.7534 47.5117 14.1648 50.1002C11.5763 52.6888 9.52289 55.7619 8.12197 59.144C6.72105 62.5261 6 66.1511 6 69.8119L33.8765 69.8119H61.7529Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4566_2575">
                        <rect width="68" height="68" rx="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              )}
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
            <Field
            className={s.field}
            placeholder="ivetta1999.23"
            type="password"
            name="password"
          />
          <ErrorMessage className={s.error} name="password" component="span" />
            <button className={s.send_button} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>

      {/* <Toaster /> */}
    </>
  );
}
