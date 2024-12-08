// @ts-nocheck
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { getTitleAlternatives } from '../../../services/Title/title.service';

import './TitleAlternatives.css';

const TitleAlternatives = () => {
  const { tconst } = useParams();
  const [alternatives, setAlternatives] = React.useState([]);

  const originalTitle = alternatives.filter(
    (alternative) => alternative.isOriginalTitle === 'True'
  );

  const otherTitles = alternatives.filter(
    (alternative) => alternative.isOriginalTitle === 'False'
  );

  const navigateToOriginalTitle = () => {
    window.location.href = `/title/${tconst}`;
  };

  useEffect(() => {
    getTitleAlternatives(tconst).then((data) => {
      console.log('alternatives', data);
      setAlternatives(data);
    });
  }, [tconst]);

  return (
    <>
      {alternatives.length === 0 ? (
        <div>No title alternatives found</div>
      ) : (
        <div className='title-alternatives__container'>
          <h2>Title Alternatives</h2>

          <div className='title-alternatives__header' onClick={navigateToOriginalTitle}>
            <span className='title-alternatives__original-title'>
              Original title: {originalTitle[0].altTitle}{' '}
            </span>

            <i className='bi bi-chevron-left title-alternatives__icon'>
              Back To Original Title
            </i>
          </div>

          <div className='title-alternatives__content'>
            <span className="text-bold">Title</span>
            <span className="text-bold">Region</span>
          </div>
          {otherTitles.map((alternative) => (
            <div
              className='title-alternatives__content'
              key={alternative.akasId}
            >
              <span>{alternative.altTitle}</span>
              <span>{alternative.region}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TitleAlternatives;
