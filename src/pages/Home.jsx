import { getCookie } from "../services/manageCookies.js"
import { parseCookieArray } from "../services/manageCookies.js"

import "../css/home.css"

import NavBar from "../components/NavBar.jsx"
import Dashboard from "../components/Dashboard.jsx"
import Header from "../components/Header.jsx"

export default function Home() {
	const uType = getCookie("Type")
	const uName = getCookie("Username")
	const uData = parseCookieArray(getCookie("Data"))
                    
	return (
		<div className="Container">
		<NavBar data={uData} user={uName} type={uType} data={uData}/>
		<main>
		<Header user={uName} type={uType} data={uData}/>
		<Dashboard user={uName} type={uType} data={uData} />
		</main>
		</div>
	);	
}
