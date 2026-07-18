import { useState } from "react"

import { getCookie } from "../services/manageCookies.js"
import { parseCookieArray } from "../services/manageCookies.js"

import { createUserS } from "../services/db.js"
import { deleteUserS } from "../services/db.js"

import NavBar from "../components/NavBar.jsx"
import FormStyled from "../components/Form.jsx"

import { getGETParam } from "../services/httpRequests.js"

import "../css/AdminActions.css"

export default function CourseEdit() {
	const uType = getCookie("Type")
	const uName = getCookie("Username")
	const uData = parseCookieArray(getCookie("Data"))
	const editMode = getGETParam("mode")

	return (
		<div className = "Container">
		<NavBar data={uData} type={uType} />
		<main>
		{ uType === "Admin" &&
			{
				"add": UserAdd(),
					"del": UserDel(),
				"assign": UserAssign()
			}[editMode] || <h2>Invalid URL. Available editing modes include "add", "del", and "assign"</h2>
		}
		</main>
		</div>
	)
}

function UserAdd() {
	const [ userName, setUserName ] = useState("")
	const [ userPassword, setUserPassword ] = useState("")
	const [ userType, setUserType ] = useState("")
	
	const handleUserAdd = (e) => {
		e.preventDefault()
		createUserS(userName, userPassword, userType).then(e => {console.log(e)})
	}

	const handleUNameChange = (e) => {
		setUserName(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setUserPassword(e.target.value)
	}

	const handleUTypeChange = (e) => {
		setUserType(e.target.value)
	}

	const inputLines = 
		{ 
			"Username": handleUNameChange,
			"User Password": handlePasswordChange,
			"User Type": handleUTypeChange
		}
	
	return ( 
		<FormStyled title="Add a User" inputs={inputLines} submitButtonValue="Add!" onClick={handleUserAdd} />
	)
}

function UserDel() {
	const [ userName, setUserName ] = useState("")
	
	const handleUserDel = (e) => {
		e.preventDefault()
		deleteUserS(userName).then(e => {console.log(e)})
	}

	const handleUNameChange = (e) => {
		setUserName(e.target.value)
	}
	
	const inputLines = 
		{ 
			"Username": handleUNameChange
		}
	
	return ( 
		<FormStyled title="Delete a User" inputs={inputLines} submitButtonValue="Delete!" onClick={handleUserDel} />
	)
}

function UserAssign() {
	const [ userName, setUserName ] = useState("")
	const [ courseID, setCourseID ] = useState("")
	
	const handleUserAssign = (e) => {
	}

	const handleCIDChange = (e) => {
		setCourseID(e.target.value)
	}

	const handleUNameChange = (e) => {
		setUserName(e.target.value)
	}

	const inputLines = 
		{ 
			"Username": handleUNameChange,
			"Course ID": handleCIDChange
		}
	
	return ( 
		<FormStyled title="Assign a User to a Course" inputs={inputLines} submitButtonValue="Assign!" onClick={handleUserAssign} />
	)
}
