import { useState, useEffect, Fragment } from "react"

import { getCookie } from "../services/manageCookies.js"
import { parseCookieArray } from "../services/manageCookies.js"

import { courseName } from "../services/db.js"
import { getUsersOfCourse } from "../services/db.js"

import NavBar from "../components/NavBar.jsx"
import GradeRow from "../components/GradeRow.jsx"

import { getGETParam } from "../services/httpRequests.js"

export default function CourseEdit() {
	const [ cName, setCName ] = useState("Loading...")
	const [ grades, setGrades ] = useState({})
	const [ isLoading, setLoading ] = useState(true)

	const uType = getCookie("Type")
	const uName = getCookie("Username")
	const uData = parseCookieArray(getCookie("Data"))
	const cID = getGETParam("course")

	const GradeRows = () => {
		return (
			<div>
			<table><thead><tr><th>Student</th><th>Grade</th></tr></thead><tbody>
			
			{Object.entries(grades).map((([sName, sGrade]) => {
				return (
					<Fragment key={sName}>{GradeRow(sName, sGrade)}</Fragment>
				)
			}))}

			</tbody></table>
			</div>
		)
	}

	useEffect(() => {
		async function retrieveCourseName() {
			setCName(await courseName(cID))
		}
		
		async function retrieveGrades() {
			const a = await getUsersOfCourse("Student", cID)
			setGrades(a)
		}

		retrieveCourseName()
		retrieveGrades()

		return () => { setLoading(false) }
	}, [])

	return (
		<div className = "Container">
		<NavBar data={uData} type={uType} />
		<main>
		<div>
		
		<div>
		<br></br>
		<h1>Editing course: {cName}</h1>
		<br></br>
		<hr></hr>
		</div>

		<div>
		<table><thead><tr><th>Student</th><th>Grade</th></tr></thead><tbody>

		{Object.entries(grades).map((([sName, sGrade]) => {
			return (
				<GradeRow key={sName} cID={cID} uName={sName} initialGrade={sGrade} />
			)
		}))}

		</tbody></table>
		</div>

		</div>

		</main>
		</div>
	)
}
