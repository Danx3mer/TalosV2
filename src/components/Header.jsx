import "../css/Header.css"

export default function Header({user, type}) {
	return (
		<div id="Header">
		{["Admin", "Teacher", "Student"].includes(type) && <h1>{`Welcome, ${type} ${user}!`}</h1>}
		</div>
	);
}
