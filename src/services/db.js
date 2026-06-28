import userData from "../databases/user.json"

export function login(u, p) {
	return u in userData && userData[u]["Password"] === p;
}

export function userType(u) {
	return userData[u]["Type"];
}
