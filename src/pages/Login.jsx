import FormStyled from '../components/form.jsx'
import '../css/login.css'

function Login() {
	return (
		<FormStyled title='Login' inputs={['Username', 'Password']} submitButtonValue='lets a go' onCLick='submit' />
	);
}

export default Login 
