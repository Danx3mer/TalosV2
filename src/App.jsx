import Login from './pages/Login.jsx'
import { Routes, Route } from 'react-router'

export default function App() {
	return (
		<Routes>
			<Route path="/login" element=<Login/>/>
		</Routes>
	);
}
