import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'flatpickr/dist/themes/material_blue.css';
import s from './AddCardModal.module.css';
import sprite from '../../icons/icons.svg';
import Calendar from '../Calendar/Calendar';
import { addCard, fetchCards } from "../../redux/cards/operations";

const AddCardModal = ({ onClose, columnId, boardId }) => {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState('without');

  const handleSubmit = (values) => {
    const newCard = {
      title: values.title,
      description: values.description,
      priority,
      date: values.date,
      columnId,
      boardId,
    };

    console.log('Data being sent to API:', newCard);  // Логування перед відправкою

    dispatch(addCard({ newCard })).then(() => {
      dispatch(fetchCards({ boardId })); // Optional: оновлюємо список карток після додавання
      onClose();  // Закриваємо модальне вікно після додавання
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal}>
        <button type="button" className={s.closeButton} onClick={onClose}>
          <svg className={s.icon} width="18" height="18">
            <use href={`${sprite}#x-close-icon`} />
          </svg>
        </button>

        <h2 className={s.title}>Add Card</h2>

        <Formik
          initialValues={{
            title: '',
            description: '',
            date: new Date(),
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
          })}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className={s.modalForm}>
              <div>
                <Field type="text" name="title" placeholder="Title" className={s.input} />
                <ErrorMessage name="title" component="div" className={s.error} />
              </div>

              <div>
                <Field as="textarea" name="description" placeholder="Description" className={s.textarea} />
                <ErrorMessage name="description" component="div" className={s.error} />
              </div>

              <div className={s.formGroupLabelColor}>
                <label>Label color</label>
                <div className={s.labelColors}>
                  {['low', 'medium', 'high', 'without'].map(color => (
                    <label
                      key={color}
                      className={`${s.priority} ${s[color]} ${priority === color ? s.selected : ''}`}
                    >
                      <input
                        checked={priority === color}
                        value={color}
                        type="radio"
                        name="priority"
                        onChange={() => setPriority(color)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className={s.flatpickr}>
                <label htmlFor="date">Deadline</label>
                <Calendar
                  value={values.date}
                  onChange={(date) => setFieldValue('date', date)}
                />
                <ErrorMessage name="date" component="div" className={s.error} />
              </div>

              <button type="submit" className={s.addButton}>
                <svg className={s.plusIcon} width="14" height="14">
                  <use href={`${sprite}#plus-icon`} />
                </svg>
                Add
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCardModal;
