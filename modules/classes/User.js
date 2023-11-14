'use strict';

/**
 * @typedef {object} UserObject
 * @prop {string} name
 * @prop {number} birthDate - date in ms
 * @prop {Skill[]} skills
 * @prop {string[]} hobbies
 * @prop {string} languages
 * @prop {string} logo - url to logo
 * @prop {LinkLogo[]} link_logos
 * @prop {Projects[]} projects
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
 *
 * @typedef {object} Projects
 * @prop {string} name
 * @prop {string} preview
 * @prop {string} link
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
		this.link_logos = opts.link_logos;
		this.projects = opts.projects;
	}

	generateAboutMeHTML() {
		return `<li>Name: <b>${this.name}</b></li>\n<li>Age: <b>${
			this.age
		}</b></li>\n<li>Skills: <table class='skill-table'><thead><tbody>${this.skills
			.map((skill) => {
				return `<tr><td>${skill.name}</td></tr>`;
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

	generateFooterLinks() {
		let links = '';
		this.link_logos.forEach((link_logo) => {
			links += `<div class="${link_logo.name.toLowerCase()} link">
						<div
							class="logo"
							data-link="${link_logo.url}"
							title="${link_logo.name}"
						>
							${link_logo.logo}
						</div>
						<div class="link-text"><a
							href="${link_logo.url}"
							>${link_logo.name}</a
						></div>
						
					</div>`;
		});
		return links;
	}

	generatProjects() {
		let projects = '';
		this.projects.forEach((project) => {
			projects += `<div class="project">
							<a href="${project.link}"
								><img
									src="${project.preview}"
									alt="Project preview"
									class="project-image"
								/><span class="project-text">${project.name}</span></a
							>
						</div>`;
		});
		return projects;
	}

	get age() {
		let dateNow = new Date();
		let birthDate = new Date(this.birthDate);
		let age = dateNow.getFullYear() - birthDate.getFullYear();
		return age;
	}
}
