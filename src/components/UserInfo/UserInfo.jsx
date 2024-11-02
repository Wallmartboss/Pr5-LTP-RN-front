import { useState } from 'react';
import s from './UserInfo.module.css';
import { Field, Form, Formik } from 'formik';
import clsx from 'clsx';
const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const closeModal = e => {
    if (e.target === e.currentTarget || e.target.closest(`.${s.closeModal}`)) {
      setIsOpen(false);
    }
  };
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  const openModal = () => {
    setIsVisible(true);
    setIsOpen(true);
  };
  return (
    <>
      <button onClick={openModal} className={s.profile}>
        <p>Name</p>
        <img
          className={s.photo}
          src={backgroundImage || './icons/icon.svg'}
          alt=""
        />
      </button>
      <div
        onClick={closeModal}
        className={clsx(s.overlay, isOpen ? s.overlay_show : s.overlay_hidden)}
        onTransitionEnd={() => {
          if (!isOpen) setIsVisible(false);
        }}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        <div className={s.modal}>
          <span className={s.title}>Edit profile</span>
          <span className={s.closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M13.5 4.5L4.5 13.5"
                stroke="#161616"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 4.5L13.5 13.5"
                stroke="#161616"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className={s.img_wrapper}>
            <img src={backgroundImage} alt="" className={s.img} />
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
              onChange={handleImageUpload}
              id="file-upload"
              type="file"
              className={s.file_upload}
            />
          </div>

          <Formik initialValues={{}} onSubmit={() => {}}>
            <Form className={s.form}>
              <Field className={s.field} type="name" name="name" />
              <Field
                placeholder="ivetta34@gmail.com"
                className={s.field}
                type="email"
                name="email"
              />
              <Field
                className={s.field}
                placeholder="ivetta1999.23"
                type="password"
                name="password"
              />
              <button className={s.send_button} type="submit">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
