import "../css/NavBar.css"
import "../css/Buttons.css"

import { courseName } from "../services/db.js"
import { setCookie } from "../services/manageCookies.js"

export default function NavBar({user, type, data}) {
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

	const teacherNavbar = (courses) => {
		if(courses.length == 0) {
			return (
				<>
				<h3>You are currently not teaching any classes! Contact the Admin</h3>
				</>
			);
		}

		return (
			<>
			{courses.map(((courseID, index) => {
				var cName = courseName(courseID)
				return (
					<a key={index} className="NavbarBtn neutralBtn" href={`course?course=${courseID}`}>{cName}</a>
				)
			}))}	
			</>
		);
	}

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
	}

	return (
		<>
		<hr></hr>
		<hr></hr>
		<br></br>
		<a className="NavbarBtn negativeBtn" id="Logout" href="login" onClick={logout()}>Logout</a>
		</>
	);
}
