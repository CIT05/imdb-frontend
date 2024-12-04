import React from 'react';
import './Episode.css';

const Episode = ({ season, episodeNumber }) => {
  return (
    <div className="episode">
      <p>Season: {season}</p>
      <p>Episode: {episodeNumber}</p>
    </div>
  );
};

export default Episode;