import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'flatpickr/dist/themes/material_blue.css';
import s from './AddCardModal.module.css';
import sprite from '../../icons/icons.svg';
import Calendar from '../Calendar/Calendar';
import { editCard } from "../../redux/cards/operations";

const EditCardModal = ({ card, onClose }) => {
  const dispatch = useDispatch();
  const [labelColor, setLabelColor] = useState(card.labelColor || 'without');

  const handleSubmit = (values) => {
    const updatedCard = { ...values, labelColor };
    dispatch(editCard({ id: card.id, updatedCard }));
    onClose();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal}>
        <button type="button" className={s.closeButton} onClick={onClose}>
          <svg className={s.icon} width="18" height="18">
            <use href={`${sprite}#x-close-icon`} />
          </svg>
        </button>

        <h2 className={s.title}>Edit Card</h2>   
        <Formik
          initialValues={{
            title: card.title || '',
            description: card.description || '',
            priority: card.priority || 'none',
            deadline: card.deadline || new Date(),
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
          {({ setFieldValue }) => (          
            <Form className={s.modalForm}>
              <div>
                <Field type="text" name="title" placeholder="Title" className={s.input} />
                <ErrorMessage name="title" component="div" className={s.error} />
              </div>

              <div>
                <Field as="textarea" type="text" name="description" placeholder="Description" className={s.textarea} />
                <ErrorMessage name="description" component="div" className={s.error} />
              </div>  

              <div className={s.formGroupLabelColor}>
                <label>Label color</label>
                <div className={s.labelColors}>
                  {['low', 'medium', 'high', 'without'].map(color => (
                    <label
                      key={color}
                      className={`${s.priority} ${s[color]} ${labelColor === color ? s.selected : ''}`}
                    >
                      <input
                        checked={labelColor === color}
                        value={color}
                        type="radio"
                        name="labelColor"
                        onChange={() => setLabelColor(color)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className={s.flatpickr}>
                <label htmlFor="deadline">Deadline</label>
                <Calendar
                  value={card.deadline || new Date()}
                  onChange={(date) => setFieldValue('deadline', date)}
                />
                <ErrorMessage name="deadline" component="div" className={s.error} />
              </div>

              <button className={s.addButton}>
                <svg className={s.plusIcon} width="14" height="14">
                  <use href={`${sprite}#plus-icon`} />
                </svg>
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCardModal;
