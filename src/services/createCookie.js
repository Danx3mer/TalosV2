export function createCookie(name, value) {
	document.cookie = `${name}=${value}; expires=86400`
}
