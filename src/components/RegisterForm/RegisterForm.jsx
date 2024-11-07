import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './RegisterForm.module.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register as registerUser } from '../../redux/auth/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import sprite from '../../icons/icons.svg';
import Loader from '../Loader/Loader';

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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async data => {
    setIsSubmitting(true);
    const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
      toast.success('Registration successful! Logging in...');
      onSuccess();
    } else {
      if (result.payload?.status === 401) {
        toast.error('Registration failed. Please try again.');
      } else {
        toast.error(result.payload || 'Registration failed. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  if (isSubmitting || isLoading) {
    return <Loader />;
  }

  return (
    <div className={s.container}>
      {isLoading && <Loader />}
      <form className={s.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formTitle}>
          <Link to="/auth/register" className={`${s.register} ${s.active}`}>
            Registration
          </Link>
          <Link to="/auth/login" className={s.login}>
            Log In
          </Link>
        </div>

        <input
          {...register('name')}
          placeholder="Enter your name"
          className={errors.name ? s.errorInput : ''}
        />
        {errors.name && <p className={s.errorMessage}>{errors.name.message}</p>}

        <input
          {...register('email')}
          placeholder="Enter your email"
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
        <button className={s.registerButton} type="submit" disabled={isLoading}>
          Register Now
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
