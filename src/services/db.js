import { supabase } from "./supabase.ts";

async function selectData(relation, col, identifierCol, identifierVal) {
	const { data, error } = await supabase
		.from(relation)
		.select(col)
		.eq(identifierCol, identifierVal);
	return data[0][col];
}

// SUPABASE AUTH
export async function login(username, password) {
	const { data, e } = await supabase.auth.signInWithPassword({
		email: `${username.toLowerCase()}@talosv2.com`,
		password: password,
	});

	return data["session"] !== null;
}

// SUPABASE PROFILES DB
export async function userType(username) {
	return selectData("profiles", "type", "username", username);
}

//SUPABASE COURSE DB
export async function createCourse(cID, cName) {
	const { error } = await supabase
		.from("courses")
		.insert({ id: cID, name: cName });

	return error;
}

export async function deleteCourse(cID) {
	const { error } = await supabase.from("courses").delete().eq("id", cID);

	return error;
}

export async function getCourse(cID) {
	const { data, error } = await supabase.from("courses").select().eq("id", cID);
	return data;
}

export async function updateStudentGrade(uName, cID, grade) {
	let oldGrades = await selectData("courses", "students", "id", cID);
	oldGrades[uName] = grade;

	const { data, error } = await supabase
		.from("courses")
		.update({ students: oldGrades })
		.eq("id", cID);

	return data;
}

export async function assignUserToCourse(uName, cID) {
	const uType = await userType(uName);

	if (uType === "Teacher") {
		let oldData = await selectData("courses", "teachers", "id", cID);

		oldData.push(uName);

		const { data, error } = await supabase
			.from("courses")
			.update({ teachers: oldData })
			.eq("id", cID);

		return data;
	} else {
		let oldData = await selectData("courses", "students", "id", cID);

		oldData[uName] = 0;

		const { data, error } = await supabase
			.from("courses")
			.update({ students: oldData })
			.eq("id", cID);

		return data;
	}
}

export async function createUserS(username, password, uType) {
	const { data, error } = await supabase.functions.invoke("create-account", {
		method: "POST",
		body: {
			email: `${username.toLowerCase()}@talosv2.com`,
			password: password,
		},
	});

	const { dataProfile, errorProfile } = await supabase
		.from("profiles")
		.insert({ type: uType, username: username, uid: data["user"]["id"] });

	return dataProfile;
}

export async function deleteUserS(username) {
	const { user, error } = await supabase.functions.invoke("delete-account", {
		method: "POST",
		body: {
			username: username,
		},
	});

	return user;
}

async function getAmtUsersOfType(t) {
	const { data, error } = await supabase.from("profiles").select().eq("type", t)

	return data.length;
}

async function getCoursesOf(uName) {
	const { data, error } = await supabase
		.from("courses")
		.select("id")
		.contains('teachers', [uName])

	let res = []

	for(let course of data) {
		res.push(course["id"])
	}

	return res
}

export async function userData(uName) {
	let uType = await userType(uName);

	switch (uType) {
		case "Admin":
			{
				let amtTeachers = await getAmtUsersOfType("Teacher");
				let amtStudents = await getAmtUsersOfType("Student");
				let amtCourses = await getAmtCourses();

				return [amtTeachers, amtStudents, amtCourses];
			}
			break;
		default:
			return await getCoursesOf(uName);
	}
}

// COURSE DB
async function getAmtCourses() {
	const { data, error } = await supabase.from("courses").select();

	return data.length;
}

export async function courseName(cID) {
	return await selectData("courses", "name", "id", cID)
}

export async function getUsersOfCourse(uType, cID) {
	if (!["Teacher", "Student"].includes(uType)) return false;

	switch(uType) {
		case "Teacher": {
			return await selectData("courses", "teachers", "id", cID)
		}
			break;
		case "Student": {
			return await selectData("courses", "students", "id", cID)
		}
			break;
	}
}
