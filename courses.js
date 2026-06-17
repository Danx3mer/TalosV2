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

	sIndicator = document.getElementById("successIndicator")
	sIndicator.hidden = true;
	if(success != null) {
		if(success == "True") {
			sIndicator.hidden=false;
			sIndicator.innerHTML = "<h3>Action Successful!</h3>"
			sIndicator.classList.replace('unsuccessful','successful')
		}
		else if(success == "False") {
			sIndicator.hidden=false;
			sIndicator.innerHTML = "<h3>Action Failed!</h3><p>Please try again.</p>"
			sIndicator.classList.replace('successful','unsuccessful')
		}
	}

	navbar.innerHTML += `<h4>User</h4>`
	navbar.innerHTML += `<a class="NavbarBtn positiveBtn" href=\"users.html?mode=add\">Add user</a>`
	navbar.innerHTML += `<a class="NavbarBtn negativeBtn" href=\"users.html?mode=del\">Delete user</a>`
	navbar.innerHTML += `<a class="NavbarBtn neutralBtn" href=\"users.html?mode=assign\">Modify user</a>`

	navbar.innerHTML += `<hr><hr><br><a class="NavbarBtn negativeBtn" id=\"Logout\" href="logout.py">Logout</a>`

	innerhtml = `<input type="hidden" name="type" value=${mode}>`;
	
	switch(mode) {
		case "add": {
			innerhtml += "<h2>Add a course:</h2>"
			innerhtml += `Course ID: <input type='text' name='cID' placeholder='Enter Course ID Here'><br><br>`
			innerhtml += `Course Name: <input type='text' name='cName' placeholder='Enter Course Name Here'><br><br>`
		}
			break;
		case "del": {
			innerhtml += `<h2>Delete a course:</h2>`
			innerhtml += `Course ID: <input type='text' name='cID' placeholder='Enter Course ID Here'><br><br>`
		}
			break;
		default: {
			innerhtml += `<h2>Invalid URL!</h2>`;
			document.getElementById("form").innerHTML = "";
		}
	}

	document.getElementById("form").innerHTML = innerhtml + document.getElementById("form").innerHTML;
}
