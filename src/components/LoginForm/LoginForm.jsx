import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './LoginForm.css';
import toast from 'react-hot-toast';
import { login } from '../../redux/auth/operations.js';
import { Link } from 'react-router-dom';
import sprite from '../../icons/icons.svg';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Too Short! Please type min 8 symbols')
    .max(64, 'Too Long! Must be up max 64 symbols')
    .required('Password is required'),
});

const LoginForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success('Login successful!');
      onSuccess();
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="formTitle">
          <Link to="/auth/register" className="register">
            Registration
          </Link>
          <Link to="/auth/login" className="login active">
            Log In
          </Link>
        </div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}

        <div className="passwordInput">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
          />
          <span
            className="passwordToggleIcon"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg className="icon">
              <use href={`${sprite}#eye-icon`} />
            </svg>
          </span>
        </div>
        {errors.password && <p>{errors.password.message}</p>}

        <button className="loginButton" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In Now'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
