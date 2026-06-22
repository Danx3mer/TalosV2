import '.././css/form.css'

function FormStyled({title, inputs, submitButtonValue, onClick}) {
	return (
		<div className="form">
		<h1>{title}</h1>
		<p>{inputs}</p>
		{ inputs.map((inputName, index) => {
			return <InputLine key={index} valueName={inputName} />
		})}
		<input className='btn' type='submit' action={onClick} name='submit' value={submitButtonValue}></input>
		</div>
	)
}

function InputLine({valueName}) {
	return (
		<>
		<p>{valueName}:</p>
		<input className='input' type='text' name={valueName} placeholder={`Enter ${valueName} Here`}></input>
		</>
	)
}

export default FormStyled 
