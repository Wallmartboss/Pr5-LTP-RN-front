import { useNavigate, useParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import s from './AuthPage.module.css';
import { Toaster } from 'react-hot-toast';

const AuthPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/home');
  };
  const handleError = () => {
    navigate('/welcome');
  };

  return (
    <div className={s.authPage}>
      <Toaster />
      {id === 'login' ? (
        <LoginForm onSuccess={handleSuccess} />
      ) : (
        <RegisterForm onSuccess={handleSuccess} onError={handleError} />
      )}
    </div>
  );
};

export default AuthPage;
