class SearchService {
	constructor(baseURL = `${process.env.REACT_APP_BASE_URL}/api/search/`) {
		this.baseURL = baseURL;
	}

	async search(query) {
		try {
			const response = await fetch(
				`${this.baseURL}title/best/${encodeURIComponent(query)}`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
			throw error;
		}
	}

	async searchTitle(title) {
		try {
			const response = await fetch(
				`${this.baseURL}title/${encodeURIComponent(title)}`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
			throw error;
		}
	}

	async searchName(name) {
		try {
			const response = await fetch(
				`${this.baseURL}actor/${encodeURIComponent(name)}`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
			throw error;
		}
	}

	async loginSearchTitle(userId, title, token) {
		try {
			const response = await fetch(
				`${this.baseURL}title/${encodeURIComponent(
					userId
				)}/${encodeURIComponent(title)}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
			throw error;
		}
	}

	async loginSearchName(userId, name, token) {
		try {
			const response = await fetch(
				`${this.baseURL}actor/${encodeURIComponent(
					userId
				)}/${encodeURIComponent(name)}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
			throw error;
		}
	}
	async searchTitleWithParams(params) {
		try {
			const response = await fetch(`${this.baseURL}title`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
			throw error;
		}
	}

	async searchActorsWithParams(params) {
		try {
			const response = await fetch(`${this.baseURL}actor`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
			throw error;
		}
	}
}

const searchServiceInstance = new SearchService();

export default searchServiceInstance;
