import { useState } from "react"

import { updateStudentGrade } from "../services/db.js"

export default function GradeRow({cID, uName, initialGrade}) {
	const [ grade, setGrade	] = useState(initialGrade)

	const handleGradeUpdate = (e) => {
		setGrade(e.target.value);
		updateStudentGrade(uName, cID, e.target.value)
	}

	return (
		<tr>
		<td>{uName}</td>
		<td><input name={uName} type='number' value={grade} onChange={handleGradeUpdate}></input></td>
		</tr>
	)
}
