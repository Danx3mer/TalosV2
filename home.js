function getCookie(cookieName) {
	let cookies = document.cookie.split(";");

	for(let i=0; i<cookies.length; i++) {
		let pair = cookies[i].split('=');
		let key = pair[0].trim();

		if(key === cookieName) {
			return pair[1].trim();
		}
	}

	return null;
}

function parseCookieArray(cookie) {
	return JSON.parse(cookie.replace(/'/g, '"'));
}

const username = getCookie('username')
const type = getCookie('type')
const data = parseCookieArray(getCookie('data'))
const courses = parseCookieArray(getCookie('courseData'))

displayDashboard(username, type)

function displayDashboard(uname, utype) {
	document.getElementById("header").innerHTML = `<h1>Welcome, ${type} ${username}!</h1>`

	navbar = document.getElementById("Navbar");	
	dashboard = document.getElementById("dashboard");
	
	switch(utype) {
		case 'Admin': {
			teachers = data[0]
			students = data[1]
			courses = data[2]
			dashboard.innerHTML = "<h3>Welcome to the admin dashboard! Use the navigation bar on your left to modify your school!</h3>\n"
						+ `There are currently ${teachers} teachers, ${students} students, and ${courses} courses taught!`
		}
		break;
		case 'Teacher': {
			//Fill up the navbar with all classes
			if(data.length==0) {
				dashboard.innerHTML = "<h3>You are currently not teaching any classes! Contact the Admin</h3>"
				break;
			} else {
				dashboard.innerHTML = "<table><tr><th>Course ID</th><th>Course Name</th><th>Students</th></tr>";
			}

			for(var i=0; i<data.length; i++) {
				var courseID = data[i];
				var courseName = courses[courseID]["Name"];
				var courseStudents = Object.keys(courses[courseID]["Student"]).length;
				
				dashboard.innerHTML += `<br><tr><td>${courseID}</td><td>${courseName}</td><td>${courseStudents}</td></tr>`
				navbar.innerHTML += `<a class=\"NavbarBtn\" href=\"course.html?course=${courseID}\">${courseName}</a>`	
			}
			
			dashboard.innerHTML += "</table>"
		}
		break;
		case 'Student': {
			if(data.length==0) {
				dashboard.innerHTML = "<h3>You are currently not teaching any classes! Contact the Admin</h3>"
				break;
			} else {
				dashboard.innerHTML = "<table><tr><th>Course Name</th><th>Teacher Name</th><th>Grade</th></tr>";
			}

			for(var i=0; i<data.length; i++) {
				var courseID = data[i];
				var courseName = courses[courseID]["Name"]
				var courseTeacher = courses[courseID]["Teacher"]
				var courseGrade = courses[courseID]["Student"][username]

				dashboard.innerHTML += `<br><tr><td>${courseName}</td><td>${courseTeacher}</td><td>${courseGrade}</td></tr>`
			}

			dashboard.innerHTML += "</table>"
		}
		break;
	}
}
