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
	document.getElementById("header").innerHTML += `<h1>Welcome, ${type} ${username}!</h1>`

	navbar = document.getElementById("Navbar");	
	dashboard = document.getElementById("dashboard");
	
	switch(utype) {
		case 'Admin': {
			teachers = data[0]
			students = data[1]
			course = data[2]
			dashboard.innerHTML = "<div id='adminDashboard'><h3>Welcome to the admin dashboard! Use the navigation bar on your left to modify your school!</h3>\n"
						+ `<h4>There are currently ${teachers} teachers, ${students} students, and ${course} courses taught!</h4></div>`
			
			navbar.innerHTML += `<h4>Course</h4>`
			navbar.innerHTML += `<a class="NavbarBtn positiveBtn" href=\"courses.html?mode=add\">Add a course</a>`
			navbar.innerHTML += `<a class="NavbarBtn negativeBtn" href=\"courses.html?mode=del\">Delete a course</a>`

			navbar.innerHTML += `<h4>User</h4>`
			navbar.innerHTML += `<a class="NavbarBtn positiveBtn" href=\"users.html?mode=add\">Add user</a>`
			navbar.innerHTML += `<a class="NavbarBtn negativeBtn" href=\"users.html?mode=del\">Delete user</a>`
			navbar.innerHTML += `<a class="NavbarBtn neutralBtn" href=\"users.html?mode=assign\">Modify user</a>`
		}
		break;
		case 'Teacher': {
			dashboardInnerHtml = ""
			if(data.length==0) {
				dashboard.innerHTML = "<h3>You are currently not teaching any classes! Contact the Admin</h3>"
				break;
			} else {
				navbar.innerHTML += "<h4>Courses</h4>"
				dashboardInnerHtml = "<table><thead><tr><th>Course ID</th><th>Course Name</th><th>Students</th></tr></thead><tbody>";
			}

			for(var i=0; i<data.length; i++) {
				var courseID = data[i];
				var courseName = courses[courseID]["Name"];
				var courseStudents = Object.keys(courses[courseID]["Student"]).length;
				
				dashboardInnerHtml += `<tr><td>${courseID}</td><td>${courseName}</td><td>${courseStudents}</td></tr>`
				navbar.innerHTML += `<a class="NavbarBtn neutralBtn" href="course.html?course=${courseID}">${courseName}</a>`	
			}
			
			dashboard.innerHTML = dashboardInnerHtml + "</tbody></table>"
		}
		break;
		case 'Student': {
			dashboardInnerHtml = ""
			if(data.length==0) {
				dashboard.innerHTML = "<h3>You are currently not in any classes!</h3>"
				break;
			} else {
				dashboardInnerHtml = "<table><tr><th>Course Name</th><th>Teacher Name(s)</th><th>Grade</th></tr>";
			}

			for(var i=0; i<data.length; i++) {
				var courseID = data[i];
				var courseName = courses[courseID]["Name"]
				var courseTeacher = courses[courseID]["Teacher"].join(', ')
				var courseGrade = courses[courseID]["Student"][username]
				
				dashboardInnerHtml += `<tr><td>${courseName}</td><td>${courseTeacher}</td><td>${courseGrade}</td></tr>`
			}

			dashboard.innerHTML = dashboardInnerHtml + "</table>"
		}
		break;
	}
	
	navbar.innerHTML += `<hr><hr><br><a class="NavbarBtn negativeBtn" id=\"Logout\" href="logout.py">Logout</a>`
}
