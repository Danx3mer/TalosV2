import { useState } from "react"
import { Fragment } from "react"

import { getCookie } from "../services/manageCookies.js"
import { parseCookieArray } from "../services/manageCookies.js"

import { courseName } from "../services/db.js"
import { getUsersOfCourse } from "../services/db.js"

import NavBar from "../components/NavBar.jsx"

import { getGETParam } from "../services/httpRequests.js"

import "../css/AdminActions.css"

export default function CourseEdit() {
	const uType = getCookie("Type")
	const uName = getCookie("Username")
	const uData = parseCookieArray(getCookie("Data"))
	const cID = getGETParam("course")

	return (
		<div className = "Container">
		<NavBar data={uData} type={uType} />
		<main>
		<div>
		
		<div>
		<br></br>
		<h1>Editing course: {courseName(cID)}</h1>
		<br></br>
		<hr></hr>
		</div>

		<div>
		<table><thead><tr><th>Student</th><th>Grade</th></tr></thead><tbody>
		{Object.entries(getUsersOfCourse("Student", cID)).map((([sName, sGrade]) => {
			return (
				<Fragment key={sName}>{GradeRow(sName, sGrade)}</Fragment>
			)
		}))}
		</tbody></table>
		</div>
		</div>
		
		</main>
		</div>
	)
}

function GradeRow(name, initialGrade) {
	const [ grade, setGrade	] = useState(initialGrade)

	const handleGradeUpdate = (e) => {
		setGrade(e.target.value);
	}

	return (
		<tr key={name}><td>{name}</td><td><input name={name} type='number' value={grade} onChange={handleGradeUpdate}></input></td></tr>
	)
}
