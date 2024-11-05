import s from './Logout.module.css';
import sprite from '../../../icons/icons.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/operations';

const Logout = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
      };


  return (
    <div className={s.block}>
      <button onClick={onLogout} className={s.logoutBtn}>
        <svg className={s.logoutIcon} width="32" height="32">
          <use href={`${sprite}#logout-icon`} />
        </svg>
        <p className={s.logoutText}>
          Log out
        </p>
      </button>
    </div>
  );
};

export default Logout;
