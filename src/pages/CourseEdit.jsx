import { getCookie } from "../services/manageCookies.js"
import { parseCookieArray } from "../services/manageCookies.js"

import NavBar from "../components/NavBar.jsx"
import FormStyled from "../components/Form.jsx"

import "../css/AdminActions.css"

export default function CourseEdit() {
	const uType = getCookie("Type")
	const uName = getCookie("Username")
	const uData = parseCookieArray(getCookie("Data"))
	
	return (
		<div className = "Container">
		<NavBar data={uData} user={uName} type={uType} />
		<main>
		<FormStyled title="Course Editor" inputs={[]} submitButtonValue="Edit Course" onCLick={() => {}} />
		</main>
		</div>
	)
}
