const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

const PORT = 8080;

app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'image', 'favicon.ico')));

app.get('/', (req, res) => {
	// console.log(req?.cookies);
	// console.log(req?.signedCookies);

	let file = fs.readFileSync('./html/index.html').toString();
	res.send(file);
});

app.get('/User.js', (req, res) => {
	let file = fs.readFileSync('./modules/classes/User.js');
	res.contentType('application/javascript');
	res.send(file);
});

app.get('/aboutMe', (req, res) => {
	let file = JSON.parse(fs.readFileSync('./database/aboutMe.json'));
	res.send(file);
});

app.get('/favicon.ico', (req, res) => {
	let file = fs.readFileSync('./image/logo.png');
	res.send(file);
});

app.use(express.static('./css'));
app.use(express.static('./js'));
app.use(express.static('./image'));

app.listen(PORT, () => {
	console.log(`Server running on: ${PORT}`);
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
