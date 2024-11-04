/*шаблон сторінки для корекції  */
import { Link } from 'react-router-dom';
import './WelcomePage.module.css';
import logo from '../../icons/icon.svg';
import user_ava from '../../icons/Image 1.png';
const WelcomePage = () => (
  <div className="welcomePage">
    <img src={user_ava} alt="user_ava" className="user_ava" />
    <div className="logoTitle">
      <img src={logo} alt="logo" />
      Task Pro
    </div>
    <p className="welcomeText">
      Supercharge your productivity and take control of your tasks with Task Pro
      - Don't wait, start achieving your goals now!
    </p>
    <Link to="/auth/register" className="linkRegister">
      Register
    </Link>
    <Link to="/auth/login" className="linkLogin">
      Log In
    </Link>
  </div>
);

export default WelcomePage;
