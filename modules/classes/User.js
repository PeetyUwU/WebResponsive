/**
 * @typedef {object} UserObject
 * @prop {string} name
 * @prop {number} birthDate - date in ms
 * @prop {Skill[]} skills
 * @prop {string[]} hobbies
 * @prop {string} languages
 * @prop {string} logo - url to logo
 * @prop {LinkLogo[]} link_logos
 *
 * @typedef {object} Skill
 * @prop {string} name
 * @prop {number} rating
 * @prop {string} logo - url to logo
 *
 * @typedef {object} LinkLogo
 * @prop {string} url
 * @prop {string} logo
 * @prop {string} name
 */

class User {
	/**
	 *
	 * @param {UserObject} opts
	 */
	constructor(opts = {}) {
		this.name = opts.name;
		this.birthDate = opts.birthDate;
		this.skills = opts.skills;
		this.hobbies = opts.hobbies;
		this.Languages = opts.languages;
		this.logo = opts.logo;
	}

	generateAboutMeHTML() {
		return `<li>Name: <b>${this.name}</b></li>\n<li>Age: <b>${
			this.age
		}</b></li>\n<li>Skills: <table class='skill-table'><thead><tr><th>Name</th><th>Rating</th></tr></thead><tbody>${this.skills
			.map((skill) => {
				return `<tr><td>${skill.name}</td><td>${skill.rating}</td></tr>`;
			})
			.join(
				''
			)}</tbody></table></li><li>Hobby: <table class='hobby-table'><tbody>${this.hobbies
			.map((hobby) => {
				return `<tr><td>${hobby}</td></tr>`;
			})
			.join(
				''
			)}</tbody></table></li><li>Languages: <table class='language-table'><tbody>${this.Languages.map(
			(language) => {
				return `<tr><td>${language}</td></tr>`;
			}
		).join('')}</tbody></table></li>`;
	}

	get age() {
		let dateNow = new Date();
		let birthDate = new Date(this.birthDate);
		let age = dateNow.getFullYear() - birthDate.getFullYear();
		return age;
	}
}
