class UserService {
  constructor(baseURL = `${process.env.REACT_APP_BASE_URL}/api/user`) {
    console.log('baseURL:', baseURL);
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
        throw new Error('Could not create a new user. Please try again.');
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
      return data.token; // Return the token from the response data
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
}

export default UserService;
