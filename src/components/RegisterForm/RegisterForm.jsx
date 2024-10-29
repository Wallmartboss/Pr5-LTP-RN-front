/*шаблон сторінки для корекції  */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
})

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema),
	})

	const [showPassword, setShowPassword] = useState(false)

	const onSubmit = data => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register('name')} placeholder='Name' />
			{errors.name && <p>{errors.name.message}</p>}

			<input {...register('email')} placeholder='Email' />
			{errors.email && <p>{errors.email.message}</p>}

			<input
				{...register('password')}
				type={showPassword ? 'text' : 'password'}
				placeholder='Password'
			/>
			{errors.password && <p>{errors.password.message}</p>}

			<button type='button' onClick={() => setShowPassword(prev => !prev)}>
				{showPassword ? 'Hide' : 'Show'} Password
			</button>
			<button type='submit'>Register Now</button>
		</form>
	)
}

export default RegisterForm
