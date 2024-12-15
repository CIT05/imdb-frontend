class GenreService {
  constructor(baseURL = `${process.env.REACT_APP_BASE_URL}/api/genre`) {
    this.baseURL = baseURL;
  }

  getAllGenres = async (pageNumber) => {
    return fetch(`${this.baseURL}?pageSize=5&pageNumber=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => data);
  };

  getGenre = async (genreId) => {
    return fetch(`${this.baseURL}/${genreId}`)
      .then((response) => response.json())
      .then((data) => data);
  };
}

const genreServiceInstance = new GenreService();
export default genreServiceInstance;
