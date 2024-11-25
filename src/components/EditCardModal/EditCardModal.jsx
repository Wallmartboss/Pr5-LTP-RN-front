
import format from 'date-fns/format';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './EditCardModal.module.css';
import sprite from '../../icons/icons.svg';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editCard } from '../../redux/cards/operations';
import useOutsideAndEscapeClose from '../../hooks/useOutsideAndEscapeClose.js';
import CalendarPicker from '../CalendarPicker/CalendarPicker.jsx';

const EditCardModal = ({ boardId, card, onClose, columnId }) => {
  const dispatch = useDispatch();
  
  const modalRef = useRef();
  useOutsideAndEscapeClose(modalRef, onClose);

  const [showCalendar, setShowCalendar] = useState(false);
  const [priority, setPriority] = useState(card.priority || 'without');
  const [selectedDate, setSelectedDate] = useState(
    card.date ? new Date(card.date) : null
  );
  const formattedDate = selectedDate
    ? format(selectedDate, 'MMMM d')
    : format(new Date(), 'MMMM d');
  const displayDate = `Today, ${formattedDate}`;
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit =async values => {
    const updateData = {
      ...values,
      boardId,
      columnId,
      priority,
      date: selectedDate
        ? selectedDate.toISOString()
        : new Date().toISOString(),
    };
try {
 await dispatch(editCard({ boardId, cardId: card._id, updatedCard: updateData }));
  onClose();
  toast.success('Card updated successfully!');
} catch (error) {
  toast.error('Failed to update card. Try again.');

}
   
  };

  return (
    <div className={s.wrapper}>
      <div className={s.modal} ref={modalRef}>
        <button type="button" className={s.closeButton} onClick={onClose}>
          <svg className={s.iconClose} width="18" height="18">
            <use href={`${sprite}#x-close-icon`} />
          </svg>
        </button>

        <h2 className={s.title}>Edit Card</h2>

        <Formik
          initialValues={{
            title: card.title,
            description: card.description || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
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
                    <use href={`${sprite}#icon-arrow-down`} />
                  </svg>
                </div>
              </div>
              {showCalendar && (
                <div className={s.calendar}>
                  <CalendarPicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    closeCalendar={() => setShowCalendar(false)}
                  />
                </div>
              )}

              <button type="submit" className={s.editButton}>
                <svg className={s.editIcon} width="14" height="14">
                  <use href={`${sprite}#icon-check`} />
                </svg>
                Edit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCardModal;
