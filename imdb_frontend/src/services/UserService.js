class UserService {
	constructor(baseURL = 'https://localhost:5002/api/user') {
		this.baseURL = baseURL;
	}

	async signUp(userData) {
		try {
			const response = await fetch(this.baseURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error(
					'Could not create a new user. Please try again.'
				);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('There was a problem with creating a user.', error);
			throw error;
		}
	}

	async logIn(userData) {
		try {
			const response = await fetch(`${this.baseURL}/login`, {
				// Append /login to the base URL
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error('Could not log in. Please try again.');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('There was a problem logging in.', error);
			throw error;
		}
	}

	async getUserInfo(username) {
		try {
			const response = await fetch(`${this.baseURL}/${username}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch user info.');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching user info:', error);
			throw error;
		}
	}

	async editUser(userData, loggedInUserId) {
		try {
			const response = await fetch(`${this.baseURL}/${loggedInUserId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error('Could not modify you user. Please try again.');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with modifying your user.',
				error
			);
			throw error;
		}
	}

	async deleteUser(userData, loggedInUserId) {
		try {
			const response = await fetch(`${this.baseURL}/${loggedInUserId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error('Could not modify you user. Please try again.');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(
				'There was a problem with modifying your user.',
				error
			);
			throw error;
		}
	}

	async fetchCountries() {
		try {
			const response = await fetch('https://restcountries.com/v3.1/all');
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			const countryData = data
				.map((country) => ({
					name: country.name.common,
					code: country.cca2.toLowerCase(),
				}))
				.sort((a, b) => a.name.localeCompare(b.name));
			return countryData;
		} catch (err) {
			console.error('Error fetching country data:', err);
			throw err;
		}
	}
}

export default UserService;
