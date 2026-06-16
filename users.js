const queryString = window.location.search;


const urlParams = new URLSearchParams(queryString);

const mode = urlParams.get('mode');
const success = urlParams.get('success');

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

displayCourseEditor()

function displayCourseEditor() {
	navbar = document.getElementById("Navbar");	

	navbar.innerHTML += `<h4>Back Home</h4>`
	navbar.innerHTML += `<a class="NavbarBtn neutralBtn" href=\"home.html\">Home</a>`
	
	if(type != "Admin") {
		return;
	}

	var innerhtml = "";

	if(success !== null) {
		//TODO: modify successIndicator based on success get request
	}


	navbar.innerHTML += `<h4>Course</h4>`
	navbar.innerHTML += `<a class="NavbarBtn positiveBtn" href=\"courses.html?mode=add\">Add a course</a>`
	navbar.innerHTML += `<a class="NavbarBtn negativeBtn" href=\"courses.html?mode=del\">Delete a course</a>`
	navbar.innerHTML += `<hr><hr><br><a class="NavbarBtn negativeBtn" id=\"Logout\" href="logout.py">Logout</a>`

	switch(mode) {
		case "add": {
			innerhtml = "<h2>Add a user:</h2>"
			innerhtml += `Username: <input type='text' name='username' placeholder='Enter Username Here'><br><br>`
			innerhtml += `Password: <input type='text' name='password' placeholder='Enter Password Here'><br><br>`
			//TODO: make a selector
			innerhtml += `Type: <input type='text' name='uType' placeholder='Enter User Type Here'><br><br>`
		}
			break;
		case "del": {
			innerhtml = `<h2>Delete a user:</h2>`
			innerhtml += `Username: <input type='text' name='username' placeholder='Enter Username Here'><br><br>`
		}
		break;
		case "assign": {
			innerhtml = "<h2>Modify a user:</h2>"
			innerhtml += "<h4>If the user is already in the selected course, they will be removed, otherwise they will be added to that course. </h4>"
			innerhtml += `Username: <input type='text' name='username' placeholder='Enter Username Here'><br><br>`
			innerhtml += `Course: <input type='text' name='course' placeholder='Enter Course Name Here'><br><br>`
		}
		break;
		default: {
			innerhtml = `<h2>Invalid URL!</h2>`;
			document.getElementById("form").innerHTML = "";
		}
	}

	document.getElementById("form").innerHTML = innerhtml + document.getElementById("form").innerHTML;
}
