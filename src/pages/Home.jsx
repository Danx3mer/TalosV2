import { getCookie } from "../services/manageCookies.js"

import "../css/home.css"

import NavBar from "../components/NavBar.jsx"
import Dashboard from "../components/Dashboard.jsx"
import Header from "../components/Header.jsx"

export default function Home() {
	const uType = getCookie("Type")
	const uName = getCookie("Username")
	
	return (
		<div className="Container">
		<NavBar name={uName} type={uType} />
		<main>
		<Header name={uName} type={uType} />
		<Dashboard name={uName} type={uType} />
		</main>
		</div>
	);	
}
