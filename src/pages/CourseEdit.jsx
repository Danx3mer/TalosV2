import { useState } from "react"

import { getCookie } from "../services/manageCookies.js"
import { parseCookieArray } from "../services/manageCookies.js"

import { createCourse } from "../services/db.js"
import { deleteCourse } from "../services/db.js"

import { getGETParam } from "../services/httpRequests.js"

import NavBar from "../components/NavBar.jsx"
import FormStyled from "../components/Form.jsx"

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
		e.preventDefault()
		createCourse(courseID, courseName).then(e => {console.log(e)})	
	}

	const handleCourseIDChange = (e) => {
		setCourseID(e.target.value)
	}

	const handleCourseNameChange = (e) => {
		setCourseName(e.target.value)
	}

	const inputLines = 
		{ 
			"Course ID": handleCourseIDChange,
			"Course Name": handleCourseNameChange
		}

	return ( 
		<FormStyled title="Add a Course" inputs={inputLines} submitButtonValue="Add!" onClick={handleCourseAdd} />
	)
}

function CourseDel() {
	const [ courseID, setCourseID ] = useState("")

	const handleCourseDel = (e) => {
		e.preventDefault()
		deleteCourse(courseID).then(e => {console.log(e)})
	}

	const handleCourseIDChange = (e) => {
		setCourseID(e.target.value)
	}

	const inputLines = 
		{ 
			"Course ID": handleCourseIDChange,
		}

	return ( 
		<FormStyled title="Delete a Course" inputs={inputLines} submitButtonValue="Delete!" onClick={handleCourseDel} />
	)
}
