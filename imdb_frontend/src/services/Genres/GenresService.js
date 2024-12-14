const getAllGenres = async (pageNumber) => {
  return fetch(
    `${process.env.REACT_APP_BASE_URL}/api/genre?pageSize=5&pageNumber=${pageNumber}`
  )
    .then((response) => response.json())
    .then((data) => data);
};

const getGenre = async (genreId) => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/api/genre/${genreId}`)
    .then((response) => response.json())
    .then((data) => data);
};

export { getAllGenres, getGenre };
