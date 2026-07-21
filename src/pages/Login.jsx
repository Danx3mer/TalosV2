import { useState } from 'react'
import { useNavigate } from 'react-router'

import { loginS } from "../services/db.js"
import { userType } from "../services/db.js"
import { userData } from "../services/db.js"

import { setCookie } from "../services/manageCookies.js"

import FormStyled from '../components/Form.jsx'

import '../css/login.css'

function Login() {
	let [ username, setUsername ] = useState("")
	let [ password, setPassword ] = useState("")
	let navigate = useNavigate()

	const handleLogin = (e) => {
		e.preventDefault()
		
		loginS(username, password).then(success => {
			if(!success) return;

			setCookie("Username", username);
			userType(username).then(uType => {
				setCookie("Type", uType)
				userData(username).then(data => {
					setCookie("Data", data); 
					navigate('/home-page');
				});
			});
		})
	}

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
