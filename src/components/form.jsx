import '.././css/form.css'

function FormStyled({title, inputs, submitButtonValue, onClick}) {
	return (
		<div className="form">
		<form onSubmit={onClick} method="POST">
		<h1 id={`form-${title}-title`} className='formTitle'>{title}</h1>

		<hr/><br/>

		{ inputs.map((inputName, index) => {
			return <>
				<InputLine key={index} valueName={inputName} />
				{(index !== inputs.length-1) && <span><br/><br/></span>}
				</>
		})}

		<br/><br/>

		<input id={`submit-${title}`} className='formBtn' type='submit' name={`submit-${title}`} value={submitButtonValue}></input>
		</form>
		</div>
	)
}

function InputLine({valueName}) {
	return (
		<>
		{valueName}:
		<input id={`input-${valueName}`} className='formInput' type='text' name={`input-${valueName}`} placeholder={`Enter ${valueName} Here`}></input>
		</>
	)
}

export default FormStyled 
