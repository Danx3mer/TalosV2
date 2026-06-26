import '.././css/form.css'

function FormStyled({title, inputs, submitButtonValue, onClick}) {
	return (
		<div className="form">
		<form onSubmit={onClick} method="POST">
		<h1 id={`form-${title}-title`} className='formTitle'>{title}</h1>

		<hr/><br/>

		{
			Object.entries(inputs).map(([name, onUpdate]) => {
				return <>
					<InputLine key={name} valueName={name} valueOnUpdate={onUpdate} />
					{(name != Object.keys(inputs).at(-1)) && <span><br/><br/></span>}
					</>

			})
		}

		<br/><br/>

		<input id={`submit-${title}`} className='formBtn' type='submit' name={`submit-${title}`} value={submitButtonValue}></input>
		</form>
		</div>
	)
}

function InputLine({valueName, valueOnUpdate}) {
	return (
		<>
		{valueName}:
		<input 
		id={`input-${valueName}`} 
		onChange={valueOnUpdate} 
		className='formInput' 
		type='text' 
		name={`input-${valueName}`} 
		placeholder={`Enter ${valueName} Here`}>
		</input>
		</>
	)
}

export default FormStyled 
