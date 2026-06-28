import { useState } from 'react'

import { login } from "../services/db.js"
import { userType } from "../services/db.js"
import { createCookie } from "../services/createCookie.js"

import FormStyled from '../components/form.jsx'
import '../css/login.css'

function Login() {
	var [ username, setUsername ] = useState("")
	var [ password, setPassword ] = useState("")

	const handleLogin = (e) => {
		e.preventDefault()
		
		const success = login(username, password)
		
		if(success) {
			createCookie("Username", username);
			createCookie("Type", userType(username));
		}
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
