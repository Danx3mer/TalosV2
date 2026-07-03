import { useState } from "react"

import { getCookie } from "../services/manageCookies.js"
import { parseCookieArray } from "../services/manageCookies.js"

import NavBar from "../components/NavBar.jsx"
import FormStyled from "../components/Form.jsx"

import { getGETParam } from "../services/httpRequests.js"

import "../css/AdminActions.css"

export default function CourseEdit() {
	const uType = getCookie("Type")
	const uName = getCookie("Username")
	const uData = parseCookieArray(getCookie("Data"))
	const editMode = getGETParam("mode")

	console.log(editMode)
	return (
		<div className = "Container">
		<NavBar data={uData} user={uName} type={uType} />
		<main>
		{
			{
				"add": CourseAdd(),
					"del": CourseDel()
			}[editMode] || <h2>Invalid URL. Available editing modes include "add" and "del"</h2>
		}
		</main>
		</div>
	)
}

function CourseAdd() {
	const [ courseID, setCourseID ] = useState("")
	const [ courseName, setCourseName ] = useState("")
	
	const handleCourseAdd = (e) => {
	}

	const inputLines = 
		{ 
			"Course ID": setCourseID,
			"Course Name": setCourseName
		}
	
	return ( 
		<FormStyled title="Add a Course" inputs={inputLines} submitButtonValue="Add!" onClick={handleCourseAdd} />
	)
}

function CourseDel() {
	const [ courseID, setCourseID ] = useState("")
	
	const handleCourseDel = (e) => {
	}

	const inputLines = 
		{ 
			"Course ID": setCourseID,
		}
	
	return ( 
		<FormStyled title="Delete a Course" inputs={inputLines} submitButtonValue="Delete!" onClick={handleCourseDel} />
	)
}
