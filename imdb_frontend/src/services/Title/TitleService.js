// @ts-nocheck

class TitleService {
	constructor(baseURL = `${process.env.REACT_APP_BASE_URL}/api`) {
		this.baseURL = baseURL;
	}

	fetchTitle = async (tconst) => {
		return fetch(`${this.baseURL}/title/${tconst}`)
			.then((response) => response.json())
			.then((data) => data);
	};

	fetchAllTitles = async () => {
		return fetch(`${this.baseURL}/title?pageNumber=1&pageSize=50`)
			.then((response) => response.json())
			.then((data) => {
				return data;
			});
	};

	fetchPersonPhoto = async (personUrl) => {
		const nconst = personUrl.split('/').pop();
		const apiKey = process.env.REACT_APP_TMDB_API_KEY;
		const photoUrl = `https://api.themoviedb.org/3/find/${nconst}?external_source=imdb_id&api_key=${apiKey}`;
		return fetch(photoUrl)
			.then((response) => response.json())
			.then((data) => {
				if (data.person_results[0]?.profile_path) {
					const photoPath = data.person_results[0].profile_path;
					return 'https://image.tmdb.org/t/p/original/' + photoPath;
				}
				return null;
			});
	};

	fetchTitleAlternatives = async (tconst) => {
		return fetch(`${this.baseURL}/titlealternative/title/${tconst}`)
			.then((response) => response.json())
			.then((data) => data);
	};

	getTitleAlternatives = async (tconst) => {
		const titleAlternatives = await this.fetchTitleAlternatives(tconst);
		return titleAlternatives;
	};

	getTitleAndPersons = async (tconst) => {
		const title = await this.fetchTitle(tconst);

		let production = [];
		let knownFors = [];
		let principals = [];

		if (title.productionPersons && title.productionPersons.length > 0) {
			production = await Promise.all(
				title.productionPersons.map(async (productionPerson) => {
					if (productionPerson.url) {
						const photoUrl = await this.fetchPersonPhoto(
							productionPerson.url
						);
						return {
							nconst: productionPerson.url.split('/').pop(),
							primaryName: productionPerson.primaryName,
							roleId: productionPerson.roleId,
							photoUrl,
						};
					}
					return null;
				})
			);
		}

		if (title.principals && title.principals.length > 0) {
			principals = await this.handleTitlePrinciples(title.principals);
		}

		if (title.knownFors && title.knownFors.length > 0) {
			knownFors = await Promise.all(
				title.knownFors.map(async (knownFors) => {
					if (knownFors.url) {
						const nconst = knownFors.url.split('/').pop();

						const photoUrl = await this.fetchPersonPhoto(
							knownFors.url
						);
						return {
							nconst,
							url: knownFors.url,
							primaryName: knownFors.primaryName,
							photoUrl,
						};
					}
					return null;
				})
			);
		}

		const titleAndPersonsObject = {
			...title,
			productionPersons: production,
			principals,
			knownFors,
		};
		console.log('titleAndPersons', titleAndPersonsObject);
		return titleAndPersonsObject;
	};

	handleTitlePrinciples = async (principals) => {
		return await Promise.all(
			principals.map(async (principal) => {
				const person = {
					...principal,
					person: {
						...principal.person,
						nconst: principal.person.url.split('/').pop(),
					},
					photoUrl: await this.fetchPersonPhoto(principal.person.url),
				};

				if (person.characters) {
					if (!person.characters.includes('segment')) {
						try {
							const cleanedString = person.characters
								.slice(2, -2)
								.replace(/'/g, '"');

							const characterArray = [cleanedString];

							person.characters = characterArray;
						} catch (e) {
							console.error(
								'Error processing person.characters:'
							);
						}
					} else {
						try {
							const cleanedString = person.characters
								.slice(2, -2)
								.replace(/'/g, '"');

							const regex = /^([^()]+)\s\(segment\s"([^"]+)"\)$/;
							const match = cleanedString.match(regex);

							if (match) {
								person.characters = {
									characters: match[1].trim(),
									segment: match[2].trim(),
								};
							} else {
								throw new Error(
									"String format didn't match the expected pattern"
								);
							}
						} catch (e) {
							console.error(
								'Error parsing segment/character:',
								e
							);
						}
					}

					return person;
				}
				return person;
			})
		);
	};
}

const titleServiceInstance = new TitleService();

export default titleServiceInstance;
