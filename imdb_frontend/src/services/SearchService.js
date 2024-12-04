class SearchService {
    constructor(baseURL = 'http://localhost:5001/api/search/title/best/') {
        this.baseURL = baseURL;
    }

    async search(query) {
        try {
            const response = await fetch(`${this.baseURL}${encodeURIComponent(query)}`);
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

export default SearchService;