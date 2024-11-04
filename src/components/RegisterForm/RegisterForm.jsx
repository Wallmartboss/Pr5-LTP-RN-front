import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './RegisterForm.module.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register as registerUser } from '../../redux/auth/operations.js';
import sprite from '../../icons/icons.svg';

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name can be up to 32 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password can be up to 64 characters')
    .required('Password is required'),
});

const RegisterForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success('Registration successful! Logging in...');
      onSuccess();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };

  return (
    <div className={s.container}>
      <form className={s.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formTitle}>
          <Link to="/auth/register" className={`${s.register} ${s.active}`}>
            Registration
          </Link>
          <Link to="/auth/login" className={s.login}>
            Log In
          </Link>
        </div>
        <input {...register('name')} placeholder="Enter your name" />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register('email')} placeholder="Enter your email" />
        {errors.email && <p>{errors.email.message}</p>}

        <div className={s.passwordInput}>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
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
        {errors.password && <p>{errors.password.message}</p>}
        <button className={s.registerButton} type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
