const aboutMe = document.getElementById('aboutMe');
const aboutMeLogo = document.getElementById('aboutMeLogo');
const themeSwitch = document.getElementById('theme-switch');
const svgs = document.querySelectorAll('.logo');
const footerLinks = document.querySelector('.footer-links');
const projectPreview = document.getElementById('projectPreview');
const cookies = parseCookies(document.cookie);

themeSwitch.checked = cookies.theme == 'true';

themeSwitch.addEventListener('change', (e) => {
	document.cookie = `theme=${e.currentTarget.checked}`;
});

let aboutMeData;
/**
 * @type {UserObject}
 */
let user;

async function init() {
	aboutMeData = await getData('/aboutMe');
	user = new User(aboutMeData);
	setData(user.generateAboutMeHTML(), aboutMe);
	aboutMeLogo.src = user.logo;

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

	// user.link_logos.forEach((link_logo) => {
	// 	footerLinks.innerHTML += `<div class="instagram link">
	// 					<div
	// 						class="logo"
	// 						data-link="https://www.instagram.com/peety_uwu/"
	// 					>
	// 						<svg
	// 							xmlns="http://www.w3.org/2000/svg"
	// 							viewBox="0 0 448 512"
	// 						>
	// 							<!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->

	// 							<path
	// 								d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
	// 							/>
	// 						</svg>
	// 					</div>
	// 					<a
	// 						href="https://www.instagram.com/peety_uwu/"
	// 						class="link-text"
	// 						>Instagram</a
	// 					>
	// 				</div>`;
	// });
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
