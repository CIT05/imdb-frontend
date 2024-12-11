class PersonService {
	constructor(baseURL = 'https://localhost:5002/api/person') {
		this.baseURL = baseURL;
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
}

export default PersonService;
