import { Fragment } from 'react'

function FormStyled({title, inputs, submitButtonValue, onClick}) {
	return (
		<div className="w-1/3 p-15 rounded-md shadow-2xl">
		<form onSubmit={onClick} method="POST">
		<h1 id={`form-${title}-title`} className='text-lg'>{title}</h1>

		<hr/><br/>

		{
			Object.entries(inputs).map(([name, onUpdate]) => {
				return <Fragment key={name}>
					<InputLine valueName={name} valueOnUpdate={onUpdate} />
					{(name != Object.keys(inputs).at(-1)) && <span><br/><br/></span>}
					</Fragment>

			})
		}

		<br/><br/>

		<input id={`submit-${title}`} className='relative ' type='submit' name={`submit-${title}`} value={submitButtonValue}></input>
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
