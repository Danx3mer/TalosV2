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

const username = getCookie('username')
const type = getCookie('type')
const data = getCookie('data') 

displayDashboard(username, type)

function parseCookieArray(cookie) {
	return JSON.parse(cookie.replace(/'/g, '"'));
}

function displayDashboard(uname, utype) {
	document.getElementById("header").innerHTML = `<h1>Welcome, ${type} ${username}!</h1>`

	navbar = document.getElementById("Navbar");	
	dashboard = document.getElementById("dashboard");

	switch(utype) {
		case 'Admin': {
			parsed = parseCookieArray(data)
			teachers = parsed[0]
			students = parsed[1]
			courses = parsed[2]
			dashboard.innerHTML = "<h3>Welcome to the admin dashboard! Use the navigation bar on your left to modify your school!</h3>\n"
						+ `There are currently ${teachers} teachers, ${students} students, and ${courses} courses taught!`
		}
		break;
		case 'Teacher': {
			//Fill up the navbar with all classes
			
			if(data.length==0) {
				dashboard.innerHTML = "<h3>You are currently not teaching any classes! Contact the Admin</h3>"
				break;
			}
			
			parsed = parseCookieArray(data)

			navbar.innerHTML = "";
			dashboard.innerHTML = "<table><tr><th>Course ID</th><th>Course Name</th><th>Students</th></tr>";

			for(var i=0; i<parsed.length; i++) {
				var courseID = parsed[i];
				var courseName = `course${i}` //courses[courseID][];
				var courseStudents = i; //courses[courseID]["students"];
				dashboard.innerHTML += `<br><tr><td>${courseID}</td><td>${courseName}</td><td>${courseStudents}</td></tr>`
				navbar.innerHTML += `<a class=\"NavbarBtn\" href=\"course.html?course=${courseID}\">${courseName}</a>`	
			}
			
			dashboard.innerHTML += "</table>"
		}
		break;
		case 'Student': {
			//student.displayClasses();
		}
		break;
	}
}
