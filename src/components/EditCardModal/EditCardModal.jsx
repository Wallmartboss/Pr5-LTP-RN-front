// import { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import 'flatpickr/dist/themes/material_blue.css';
// import s from './AddCardModal.module.css';
// import sprite from '../../icons/icons.svg';
// import Calendar from '../Calendar/Calendar';
// import { editCard } from "../../redux/cards/operations";

// const EditCardModal = ({ card, onClose }) => {
//   const dispatch = useDispatch();
//   const [labelColor, setLabelColor] = useState(card.labelColor || 'without');

//   const handleSubmit = (values) => {
//     const updatedCard = { ...values, labelColor };
//     dispatch(editCard({ id: card.id, updatedCard }));
//     onClose();
//   };

//   return (
//     <div className={s.wrapper}>
//       <div className={s.modal}>
//         <button type="button" className={s.closeButton} onClick={onClose}>
//           <svg className={s.icon} width="18" height="18">
//             <use href={`${sprite}#x-close-icon`} />
//           </svg>
//         </button>

//         <h2 className={s.title}>Edit Card</h2>
//         <Formik
//           initialValues={{
//             title: card.title || '',
//             description: card.description || '',
//             priority: card.priority || 'none',
//             deadline: card.deadline || new Date(),
//           }}
//           validationSchema={Yup.object({
//             title: Yup.string().required('Title is required'),
//             description: Yup.string().required('Description is required'),
//           })}
//           onSubmit={(values, { resetForm }) => {
//             handleSubmit(values);
//             resetForm();
//           }}
//         >
//           {({ setFieldValue }) => (
//             <Form className={s.modalForm}>
//               <div>
//                 <Field type="text" name="title" placeholder="Title" className={s.input} />
//                 <ErrorMessage name="title" component="div" className={s.error} />
//               </div>

//               <div>
//                 <Field as="textarea" type="text" name="description" placeholder="Description" className={s.textarea} />
//                 <ErrorMessage name="description" component="div" className={s.error} />
//               </div>

//               <div className={s.formGroupLabelColor}>
//                 <label>Label color</label>
//                 <div className={s.labelColors}>
//                   {['low', 'medium', 'high', 'without'].map(color => (
//                     <label
//                       key={color}
//                       className={`${s.priority} ${s[color]} ${labelColor === color ? s.selected : ''}`}
//                     >
//                       <input
//                         checked={labelColor === color}
//                         value={color}
//                         type="radio"
//                         name="labelColor"
//                         onChange={() => setLabelColor(color)}
//                       />
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className={s.flatpickr}>
//                 <label htmlFor="deadline">Deadline</label>
//                 <Calendar
//                   value={card.deadline || new Date()}
//                   onChange={(date) => setFieldValue('deadline', date)}
//                 />
//                 <ErrorMessage name="deadline" component="div" className={s.error} />
//               </div>

//               <button className={s.addButton}>
//                 <svg className={s.plusIcon} width="14" height="14">
//                   <use href={`${sprite}#plus-icon`} />
//                 </svg>
//                 Save
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default EditCardModal;
import DatePicker from 'react-datepicker';
import format from 'date-fns/format';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './EditCardModal.module.css';
import sprite from '../../icons/icons.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editCard } from '../../redux/cards/operations';

const EditCardModal = ({ boardId, card, onClose, columnId }) => {
  const dispatch = useDispatch();

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

  const handleSubmit = values => {
    const updateData = {
      ...values,
      boardId,
      columnId,
      priority,
      date: selectedDate
        ? selectedDate.toISOString()
        : new Date().toISOString(),
    };

    dispatch(editCard({ boardId, cardId: card._id, updatedCard: updateData }));
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

        <h2 className={s.title}>Update Card</h2>

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
                  <DatePicker
                    selected={selectedDate}
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
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCardModal;
