const getAllGenres = async (pageNumber) => {
  return fetch(
    `https://localhost:5002/api/genre?pageSize=5&pageNumber=${pageNumber}`
  )
    .then((response) => response.json())
    .then((data) => data);
};

const getGenre = async (genreId) => {
  return fetch(`https://localhost:5002/api/genre/${genreId}`)
    .then((response) => response.json())
    .then((data) => data);
};

export { getAllGenres, getGenre };
