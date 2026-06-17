const queryString = window.location.search;
			
const urlParams = new URLSearchParams(queryString);

const course = urlParams.get('course');

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

var innerHTML = ""

displayContent(username, type)

function displayContent(uname, utype) {
	document.getElementById("header").innerHTML += `<h1>Welcome, ${type} ${username}!</h1>i`

	navbar = document.getElementById("Navbar");	
	dashboard = document.getElementById("dashboard");
	
	console.log(data)
	console.log(course)

	var courseStudents = courses[course]["Student"];

	innerHTML += `<input type="hidden" name="course" value="${course}">`;
	innerHTML += "<table><tr><th>Student</th><th>Grade</th></tr>"

	for(const [student, grade] of Object.entries(courseStudents)) {
		innerHTML += `<br><tr><td>${student}</td><td><input type='text' name='student-${student}' value='${grade}'></td></tr>`
	}

	innerHTML += "</table>"

	dashboard.innerHTML = innerHTML + dashboard.innerHTML

	navbar.innerHTML += `<h4>Back Home</h4>`
	navbar.innerHTML += `<a class="NavbarBtn neutralBtn" href=\"home.html\">Home</a>`
	navbar.innerHTML += `<br><h4>Courses</h4>`
	
	for(var i=0; i<data.length; i++) {
		var courseID = data[i];
		var courseName = courses[courseID]["Name"];
		var courseStudents = Object.keys(courses[courseID]["Student"]).length;

		navbar.innerHTML += `<a class="NavbarBtn neutralBtn" href="course.html?course=${courseID}">${courseName}</a>`
	}

	navbar.innerHTML += `<hr><hr><br><a class="NavbarBtn negativeBtn" id=\"Logout\" href="logout.py">Logout</a>`
}
