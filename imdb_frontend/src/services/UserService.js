class UserService {
	constructor(baseURL = `${process.env.REACT_APP_BASE_URL}/api/user`) {
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

	async editUser(userData, loggedInUserId, token) {
		try {
			const response = await fetch(`${this.baseURL}/${loggedInUserId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
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

	async deleteBookmarkedPersonality(loggedInUserId, nconst, token) {
		try {
			const response = await fetch(
				`https://localhost:5002/api/bookmarking/personality?userId=${loggedInUserId}&nconst=${nconst}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Could not delete bookmarking.');
			}
		} catch (error) {
			console.error(
				'There was a problem with deleting bookmarking.',
				error
			);
			throw error;
		}
	}

	async fetchLanguages() {
		try {
			const response = await fetch(
				'https://libretranslate.com/languages'
			);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();

			// Mapping the response to the desired format
			const languageData = data.map((language) => ({
				name: language.name,
				code: language.code,
			}));

			return languageData;
		} catch (err) {
			console.error('Error fetching language data:', err);
			throw err;
		}
	}
}

export default UserService;
