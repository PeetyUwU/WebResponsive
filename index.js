const fs = require('fs');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, res) => {
	// console.log(req?.cookies);
	// console.log(req?.signedCookies);

	let file = fs.readFileSync('./html/index.html').toString();
	res.send(file);
});

app.get('/User.js', (req, res) => {
	let file = fs.readFileSync('./modules/classes/User.js');
	res.send(file);
});

app.get('/aboutMe', (req, res) => {
	let file = JSON.parse(fs.readFileSync('./database/aboutMe.json'));
	res.send(file);
});

app.use(express.static('./css'));
app.use(express.static('./js'));
app.use(express.static('./image'));

app.listen(8080, () => {
	console.log('Server running on: 8080');
});

function parseCookies(request) {
	const list = {};
	const cookieHeader = request.headers?.cookie;
	if (!cookieHeader) return list;
	cookieHeader.split(`;`).forEach(function (cookie) {
		let [name, ...rest] = cookie.split(`=`);
		name = name?.trim();
		if (!name) return;
		const value = rest.join(`=`).trim();
		if (!value) return;
		list[name] = decodeURIComponent(value);
	});
	return list;
}
