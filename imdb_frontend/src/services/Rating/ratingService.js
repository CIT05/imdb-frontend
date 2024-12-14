const saveRating = async (userId, tconst, ratingValue) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/rating/move/${userId}/${tconst}/${ratingValue}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (!response.ok) {
      return response.status;
    }

    return response.ok;
  } catch (error) {
    console.error('There was a problem saving the rating.', error);
    throw error;
  }
};

export { saveRating };
