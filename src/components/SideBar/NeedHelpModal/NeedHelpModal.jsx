import s from './NeedHelpModal.module.css';
import Notiflix from 'notiflix';
import { useState } from 'react';

const INITIAL_STATE = {
  email: '',
  message: '',
};

const NeedHelpModal = ({ onClose, onSubmit }) => {
  const [modalState, setModalState] = useState({ ...INITIAL_STATE });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setModalState({ ...modalState, [name]: value });
  };

  const validateInput = () => {
    return modalState.message.trim() !== '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateInput()) {
      Notiflix.Notify.failure('Message cannot be empty');
      return;
    }

    onClose();
    onSubmit({ ...modalState });
    setModalState({ ...INITIAL_STATE });
  };

  const { email, message } = modalState;
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
        value={message}
        name="message"
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
