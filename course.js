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

displayDashboard(username, type)

function displayDashboard(uname, utype) {
	document.getElementById("header").innerHTML = `<h1>Welcome, ${type} ${username}!</h1><br><h2>Editing course ${course}</h2>`

	navbar = document.getElementById("Navbar");	
	dashboard = document.getElementById("dashboard");
	
	console.log(data)
	console.log(course)

	var courseStudents = courses[course]["Student"];

	innerHTML += `<input type="hidden" name="course" value="${course}">`;

	for(const [student, grade] of Object.entries(courseStudents)) {
		innerHTML += `<br><tr><td>${student}</td><td><input type='text' name='student-${student}' value='${grade}'></td></tr>`
	}

	innerHTML += "</table>"

	dashboard.innerHTML = innerHTML + dashboard.innerHTML

	navbar.innerHTML += `<hr><hr><br><a class="NavbarBtn negativeBtn" id=\"Logout\" href="logout.py">Logout</a>`
}
