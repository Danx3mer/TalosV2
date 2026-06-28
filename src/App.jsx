import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { Routes, Route } from 'react-router'

export default function App() {
	return (
		<Routes>
		<Route path="/login" element=<Login/>/>
		<Route path="/home-page" element=<Home/>/>
		</Routes>
	);
}
