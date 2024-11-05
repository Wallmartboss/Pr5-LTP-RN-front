import s from './NeedHelp.module.css';
import sprite from '../../../icons/icons.svg';
import Modal from "../NeedHelpModal/Modal/Modal.jsx";
import NeedHelpModal from '../NeedHelpModal/NeedHelpModal';
import { useState } from 'react';
import image from '../../../icons/Cactus.png';

// import { sendUserNeedHelp } from 'api/user-api';

const NeedHelp = () => {
  const [modalActive, setModalActive] = useState(false);

  const openModal = () => {
    setModalActive(true);
  };

  const forSubmitNeedHelp = async ({ description, email }) => {
    try {
      const data = { description, email };
      await sendUserNeedHelp(data);
    } catch (error) {
      console.error('Failed to send a help request', error);
    }
  };

  return (
    <div className={s.help}>
      <img className={s.helpCactusIcon} src={image} alt="Cactus" />
      <p className={s.helpText}>
        If you need help with
        <span className={s.taskProSpan}> TaskPro</span>, check out our support
        resources or reach out to our customer support team.
      </p>
      <button onClick={openModal} className={s.helpBtn}>
        <svg className={s.helpIcon} width="20" height="20">
          <use href={`${sprite}#help-icon`} />
        </svg>
        <p className={s.helpBtnText}>Need help?</p>
      </button>

      {modalActive && (
        <Modal isOpen={modalActive} onClose={() => setModalActive(false)} title="Need help">
          <NeedHelpModal onClose={() => setModalActive(false)} onSubmit={forSubmitNeedHelp} />
        </Modal>
      )}
    </div>
  );
};

export default NeedHelp;

