class PersonService {
	constructor(baseURL = `${process.env.REACT_APP_BASE_URL}/api/person`) {
		this.baseURL = baseURL;
	}

	async getAllPersons() {	
		try {
			const response = await fetch(`${this.baseURL}?pageNumber=1&pageSize=50`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch persons.');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching persons:', error);
			throw error;
		}
	}

	async getPerson(nconst) {
		try {
			const response = await fetch(`${this.baseURL}/${nconst}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch person.');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching person:', error);
			throw error;
		}
	}

	async getRatingPerson(nconst) {
		const response = await fetch(
			`${process.env.REACT_APP_BASE_URL}/api/rating/person/${nconst}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch rating for person.');
		}

		const data = await response.json();
		console.log('DATA', data);
		return data[0].personRating;
	}
	catch(error) {
		console.error('Error fetching rating for  person:', error);
		throw error;
	}
}

export default PersonService;
