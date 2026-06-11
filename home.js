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

const retrievedUsername = getCookie('username')
const retrievedType = getCookie('type')
const retrievedData = getCookie('data')

console.log(retrievedData)
