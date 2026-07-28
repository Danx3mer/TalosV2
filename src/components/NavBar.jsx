import { useState, useEffect } from "react"

import { courseName } from "../services/db.js"
import { setCookie } from "../services/manageCookies.js"

import "../css/NavBar.css"
import "../css/Buttons.css"

export default function NavBar({type, data}) {
	const [ isLoading, setLoading ] = useState(true)
	const [ courses, setCourses ] = useState({})

	const adminNavbar = () => {
		return (
			<>
			<h4>Course</h4>
			<a className="NavbarBtn positiveBtn" href="courses?mode=add">Add a course</a>
			<a className="NavbarBtn negativeBtn" href="courses?mode=del">Delete a course</a>

			<h4>User</h4>
			<a className="NavbarBtn positiveBtn" href="users?mode=add">Add user</a>
			<a className="NavbarBtn negativeBtn" href="users?mode=del">Delete user</a>
			<a className="NavbarBtn neutralBtn" href="users?mode=assign">Modify user</a>
			</>
		);
	}

	const teacherNavbar = (courseIDs) => {
		if(courseIDs.length == 0) {
			return (
				<>
				<h3>You are currently not teaching any classes! Contact the Admin</h3>
				</>
			);
		}

		if(isLoading) return <p>Loading...</p>
			else return (
				<>
				{courseIDs.map(((courseID, index) => {
					let cName = courses[courseID]
					return (
						<a key={index} className="NavbarBtn neutralBtn" href={`course?course=${courseID}`}>{cName}</a>
					)
				}))}	
				</>
			);
	}

	useEffect(() => {
		let isMounted = true

		async function retrieveCourseNames() {
			if(type === "Admin") {
				if(isMounted) setLoading(false)
				return true;
			}

			let courseJson = {}
			for(let cID of data) {
				courseJson[cID] = await courseName(cID)
			}

			if(isMounted) {
				setCourses(courseJson)
				setLoading(false)
			}
			return true
		}

		retrieveCourseNames()

		return () => { isMounted = false }
	}, [])

	return (
		<>
		<div id="NavBar">
		<h1>Talos V2</h1>	
		{
			{
				"Admin": adminNavbar(),
					"Teacher": teacherNavbar(data),
					"Student": true 
			}[type] || <h4>Invalid User!</h4> /* Cool JS object lookup trick I learned*/
		}
		{["Admin", "Teacher", "Student"].includes(type) && <LogoutButton />}
		</div>
		</>
	);
}

function LogoutButton() {
	const logout = () => {
		setCookie("Username", "", -1);
		setCookie("Type", "", -1);
		setCookie("Data", "", -1);

		navigate('/login')
	}

	return (
		<>
		<hr></hr>
		<hr></hr>
		<br></br>
		<a className="NavbarBtn negativeBtn" id="Logout" href="login" onClick={logout}>Logout</a>
		</>
	);
}
