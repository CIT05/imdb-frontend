class SearchService {
  constructor(baseURL = 'https://localhost:5002/api/search/') {
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
      console.error('There was a problem with the fetch operation:', error);
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
      console.error('There was a problem with the fetch operation:', error);
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
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }
}

const searchServiceInstance = new SearchService();

export default searchServiceInstance;
