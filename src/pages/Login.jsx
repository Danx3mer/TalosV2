import FormStyled from '../components/form.jsx'
import '../css/login.css'

function Login() {
	return (
		<FormStyled title='Login' inputs={['Banana', 'Apple']} submitButtonValue='lets a go' onCLick='submit' />
	);
}

export default Login 
