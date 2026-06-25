import FormStyled from '../components/form.jsx'
import '../css/login.css'

function Login() {
	const handleLogin = (e) => {
		e.preventDefault()	//Stop reloading
		alert('blah')
	};
	
	return (
		<FormStyled title='Login' inputs={['Username', 'Password']} submitButtonValue='lets a go' onClick={handleLogin} />
	);
}

export default Login 
