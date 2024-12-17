import React from 'react';
import './Episode.css';

const Episode = ({ season, episodeNumber }) => {
  return (
    <div className="episode">
      <p>Season: <span className='text-info'>{season}</span></p>
      <p >Episode: <span className='text-info'>{episodeNumber}</span></p>
    </div>
  );
};

export default Episode;