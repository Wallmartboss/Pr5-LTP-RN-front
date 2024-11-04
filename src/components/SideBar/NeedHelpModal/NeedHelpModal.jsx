import s from './NeedHelpModal.module.css';
import Notiflix from 'notiflix';
import { useState } from 'react';


const INITIAL_STATE = {
  email: '',
  description: '',
};

const NeedHelpModal = ({ onClose, onSubmit }) => {

  const [modalState, setModalState] = useState({ ...INITIAL_STATE });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setModalState({ ...modalState, [name]: value });
  };

  const validateInput = () => {
    return (modalState.description.trim() !== '')
  };

   const handleSubmit = e => {
    e.preventDefault();
    if (!validateInput()) {
      Notiflix.Notify.failure('Description cannot be empty')
      return;
    }

    onClose();
    onSubmit({ ...modalState });
    setModalState({ ...INITIAL_STATE });
  };

  const { email, description } = modalState;
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        value={email}
        className={`${s.input} `}
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        onChange={handleChange}
      ></input>

      <textarea
        className={`${s.textarea} `}
        value={description}
        name="description"
        rows="7"
        required
        placeholder="Comment"
        onChange={handleChange}
      ></textarea>

      <button className={`${s.btn} `} type="submit">
        Send
      </button>
    
    </form>
  );
};

export default NeedHelpModal;
