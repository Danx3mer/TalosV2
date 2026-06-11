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

displayDashboard()

function displayDashboard(username, type) {
	document.getElementbyId("header").innerHTML = `<h1>Welcome, ${type} ${username}!</h1>`

	switch(type): {
		case 'Teacher': {
			//teacher.displayClasses();
		}
		break;
		case 'Student': {
			//student.displayClasses();
		}
		break;
	}
}
