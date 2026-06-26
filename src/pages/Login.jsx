import { useState } from 'react'

import FormStyled from '../components/form.jsx'
import '../css/login.css'

function Login() {
	var [ username, setUsername ] = useState("")
	var [ password, setPassword ] = useState("")

	const handleLogin = (e) => {
		e.preventDefault()
		alert(username + password)	
	};

	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}
	
	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}
	
	const params = {
		"Username": handleUsernameChange,
		"Password": handlePasswordChange
	};

	return (
		<FormStyled title='Login' inputs={params} submitButtonValue='Login!' onClick={handleLogin} />
	);
}

export default Login;
