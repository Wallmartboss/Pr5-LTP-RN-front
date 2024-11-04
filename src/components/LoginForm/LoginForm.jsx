import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './LoginForm.module.css';
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
    <div className={s.container}>
      <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formTitle}>
          <Link to="/auth/register" className={s.register}>
            Registration
          </Link>
          <Link to="/auth/login" className={`${s.login} ${s.active}`}>
            Log In
          </Link>
        </div>
        <input
          {...register('email')}
          placeholder="Email"
          className={errors.email ? s.errorInput : ''}
        />
        {errors.email && (
          <p className={s.errorMessage}>{errors.email.message}</p>
        )}
        <div className={s.passwordInput}>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            className={errors.password ? s.errorInput : ''}
          />
          <span
            className={s.passwordToggleIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg className={s.icon}>
              <use href={`${sprite}#eye-icon`} />
            </svg>
          </span>
        </div>
        {errors.password && (
          <p className={s.errorMessage}>{errors.password.message}</p>
        )}
        <button className={s.loginButton} type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In Now'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
