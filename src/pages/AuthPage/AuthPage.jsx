/*шаблон сторінки для корекції  */
import { useParams } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/LoginForm.jsx'
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx'

const AuthPage = () => {
	const { id } = useParams()

	return (
		<div className='auth-page'>
			{id === 'login' ? <LoginForm /> : <RegisterForm />}
		</div>
	)
}

export default AuthPage
