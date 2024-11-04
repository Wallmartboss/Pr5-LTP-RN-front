import { Link } from 'react-router-dom';
import '../../css/styles.css';
import s from './WelcomePage.module.css';
import logo from '../../icons/icon.svg';
import user_ava from '../../icons/Image 1.png';
const welcomePage = () => (
  <div>
    <div className={s.welcomePage}>
      <img src={user_ava} alt="user_ava" className={s.user_ava} />
      <div className={s.logoTitle}>
        <img src={logo} alt="logo" className={s.logo} />
        Task Pro
      </div>
      <p className={s.welcomeText}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don`t wait, start achieving your goals now!
      </p>
      <Link to="/auth/register" className={s.linkButton}>
        Register
      </Link>
      <Link to="/auth/login" className={s.linkButton}>
        Log In
      </Link>
    </div>
  </div>
);

export default welcomePage;
