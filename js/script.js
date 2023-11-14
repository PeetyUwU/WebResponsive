'use strict';

const aboutMe = document.getElementById('aboutMe');
const aboutMeLogo = document.getElementById('aboutMeLogo');
const themeSwitch = document.getElementById('theme-switch');
const footerLinks = document.querySelector('.footer-links');
const projectImages = document.querySelector('.project-image');
const projectPreview = document.getElementById('projectPreview');
const cookies = parseCookies(document.cookie);

themeSwitch.checked = cookies.theme == 'true';

themeSwitch.addEventListener('change', (e) => {
	document.cookie = `theme=${e.currentTarget.checked}`;
});

let aboutMeData;
let user;

async function init() {
	aboutMeData = await getData('/aboutMe');
	user = new User(aboutMeData);
	setData(user.generateAboutMeHTML(), aboutMe);
	aboutMeLogo.src = user.logo;

	setData(user.generateFooterLinks(), footerLinks);

	listenSvgs();
}

/**
 *
 * @param {*} data
 * @param {Element} element
 */
function setData(data, element) {
	element.innerHTML = data;
}

async function getData(url) {
	try {
		let response = await fetch(url);
		return await response.json();
	} catch (err) {
		throw new Error(`Error while trying to get data from ${url}: ${err}`);
	}
}

function parseCookies(cookies) {
	const list = {};
	const cookieHeader = cookies;
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

function listenSvgs() {
	const svgs = document.querySelectorAll('.logo');
	svgs.forEach((svg) => {
		svg.addEventListener('click', (ev) => {
			window.open(ev.target.dataset.link, '_self');
		});

		svg.addEventListener('mousedown', (ev) => {
			if (ev.which === 2) {
				ev.preventDefault();
				window.open(ev.target.dataset.link, '_blank');
			}
		});
	});
}
