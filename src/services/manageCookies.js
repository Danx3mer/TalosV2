export function setCookie(name, value, seconds=86400) {
	document.cookie = `${name}=${value}; expires=${seconds}`
}

export function getCookie(cookieName) {
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

export function parseCookieArray(cookie) {
	try {
		return JSON.parse(cookie.replace(/'/g, '"'));
	} catch(e) {
		return [cookie]
	}
}
