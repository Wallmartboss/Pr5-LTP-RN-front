import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import format from 'date-fns/format';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './AddCardModal.module.css';
import sprite from '../../icons/icons.svg';
import { addCard } from '../../redux/cards/operations';

const AddCardModal = ({ onClose, columnId, boardId }) => {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState('without');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const formattedDate = selectedDate
    ? format(selectedDate, 'MMMM d')
    : format(new Date(), 'MMMM d');
  const displayDate = `Today, ${formattedDate}`;

  const handleSubmit = values => {
    console.log(boardId, columnId);
    const newCard = {
      ...values,
      date: selectedDate
        ? selectedDate.toISOString()
        : new Date().toISOString(),
      priority,
      columnId,
      boardId,
    };
    dispatch(addCard({ newCard }));
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
          {({ values }) => (
            <Form className={s.modalForm}>
              <div>
                <Field
                  type="text"
                  name="title"
                  placeholder="Title"
                  className={s.input}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={s.error}
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className={s.textarea}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.formGroupLabelColor}>
                <label className={s.labelName}>Label color</label>
                <div className={s.labelColors}>
                  {['low', 'medium', 'high', 'without'].map(color => (
                    <label
                      key={color}
                      className={`${s.priority} ${s[color]} ${
                        priority === color ? s.selected : ''
                      }`}
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

              <div className={s.deadline}>
                <label className={s.labelName} htmlFor="date">
                  Deadline
                </label>
                <div
                  className={s.currentDate}
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  {displayDate}
                  <svg className={s.icon} width="16" height="16">
                    <use href={`${sprite}#icon-arrow-down `} />
                  </svg>
                </div>
              </div>
              {showCalendar && (
                <div className={s.calendar}>
                  <DatePicker
                    selected={values.date}
                    onChange={date => {
                      setSelectedDate(date);
                      setShowCalendar(false);
                    }}
                    dateFormat="MMMM d, yyyy"
                    inline
                  />
                </div>
              )}

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
