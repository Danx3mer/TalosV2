const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const user = urlParams.get('login');

if(user!=null) {
	document.getElementById("successIndicator").hidden=false;
}
