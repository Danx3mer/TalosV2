import "../css/Header.css"

export default function Header({user, type}) {
	return (
		<div id="Header">
		{type in ["Admin", "Teacher", "Student"] && <h1>{`Welcome, ${type} ${user}!`}</h1>}
		</div>
	);
}
