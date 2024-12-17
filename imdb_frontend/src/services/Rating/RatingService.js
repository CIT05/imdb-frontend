class RatingService {
  constructor(baseURL = `${process.env.REACT_APP_BASE_URL}/api/rating`) {
    this.baseURL = baseURL;
  }
  saveRating = async (userId, tconst, ratingValue, token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/rating/movie/${userId}/${tconst}/${ratingValue}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.status;
    } catch (error) {
      console.error('There was a problem saving the rating.', error);
      throw error;
    }
  };
}

const ratingServiceInstance = new RatingService();

export default ratingServiceInstance;
