import './css/App.css'
import FormStyled from './components/form.jsx'
import TestElement from './components/Test.jsx'

function App() {
	return (
		<>
		<FormStyled title='this is a really cool title' inputs={['Banana', 'Apple']} submitButtonValue='lets a go' onCLick='submit' />
		</>
	);
}

export default App
