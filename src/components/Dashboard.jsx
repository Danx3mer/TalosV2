import "../css/Dashboard.css"

import { useState, useEffect } from "react"

import { courseName } from "../services/db.js"
import { getUsersOfCourse } from "../services/db.js"

export default function Dashboard({user, type, data}) {
	const [ isLoading, setLoading ] = useState(true)
	const [ courses, setCourses ] = useState({"": {}})

	const adminDashboard = (uData) => {
		return (
			<>
			<h4>There are currently {uData[0]} teachers, {uData[1]} students, and {uData[2]} courses taught!</h4>
			<h3>Welcome to the admin dashboard! Use the navigation bar on your left to modify your school!</h3>
			</>
		)
	}

	const teacherDashboard = (uData) => {
		if(uData.length==0) {
			return (
				<h3>You are currently not teaching any classes! Contact the Admin</h3>
			)
		}

		return (
			<>
			<table><thead><tr><th>Course ID</th><th>Course Name</th><th>Students</th></tr></thead><tbody>
			{uData.map(((courseID, index) => {
				if(!courses[courseID]) return (<></>)
				let cName = courses[courseID]["Name"]
				let courseStudents = courses[courseID]["Students"];
				return (
					<tr><td>{courseID}</td><td>{cName}</td><td>{courseStudents}</td></tr>
				);
			}))}
			</tbody></table>
			</>
		)
	}

	const studentDashboard = (uData) => {
		if(uData.length==0) {
			return (
				<h3>You are currently not taking any classes!</h3>
			)
		}
		return ( <>
			<table><thead><tr><th>Course Name</th><th>Teacher(s)</th><th>Grade</th></tr></thead><tbody>
			{uData.map(((courseID, index) => {
				let cName = courses[courseID]
				let courseTeachers = getUsersOfCourse("Teacher", courseID)
				let courseGrade = getUsersOfCourse("Student", courseID)[user]

				return (
					<tr><td>{cName}</td><td>{courseTeachers}</td><td>{courseGrade}</td></tr>
				);
			}))}
			</tbody></table>
			</>
		)
	}

	useEffect(() => {
		async function retrieveCourseNames() {
			if(type === "Admin") return true;

			let courseJson = {}
			for(let cID of data) {
				courseJson[cID] = {}
				courseJson[cID]["Name"] = await courseName(cID)
				courseJson[cID]["Students"] = Object.keys(await getUsersOfCourse("Student", cID)).length
			}

			setCourses(courseJson)
			return true
		}

		retrieveCourseNames()

		return () => { setLoading(false) }
	}, [])

	if(isLoading) return (<p>Loading...</p>);
	else return (
		<div id="Dashboard">
		{
			{
				"Admin": adminDashboard(data),
					"Teacher": teacherDashboard(data),
					"Student": studentDashboard(data)
			}[type] || <h4>Invalid User!</h4> /* Cool JS object lookup trick I learned*/
		}
		</div>
	);
}
