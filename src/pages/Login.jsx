import { useState } from 'react'
import { useNavigate } from 'react-router'

import { login } from "../services/db.js"
import { userType } from "../services/db.js"
import { userData } from "../services/db.js"

import { setCookie } from "../services/manageCookies.js"

import FormStyled from '../components/form.jsx'
import '../css/login.css'

function Login() {
	var [ username, setUsername ] = useState("")
	var [ password, setPassword ] = useState("")
	var navigate = useNavigate()

	const handleLogin = (e) => {
		e.preventDefault()
		
		const success = login(username, password)
		
		if(success) {
			setCookie("Username", username);
			setCookie("Type", userType(username));
			setCookie("Data", userData(username)); 

			navigate('/home-page')
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
