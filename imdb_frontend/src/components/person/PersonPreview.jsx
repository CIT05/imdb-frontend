import React from 'react';
import Image from 'react-bootstrap/Image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './PersonPreview.css';

const PersonPreview = ({ name, character, job, img, isSmall, onClick }) => {
  return (
    <div className='person-preview' onClick={onClick}>
      {img ? (
        <Image
          src={img}
          alt={name}
          className={isSmall ? 'person-preview__photo--small' : 'person-preview__photo'}
          roundedCircle
        />
      ) : (
        <i className={isSmall ? 'bi bi-person-circle person-preview__photo-blank--small' : 'bi bi-person-circle person-preview__photo-blank'}></i>
      )}
      <div className='person-preview__info'>
        <h4 className='person-preview__name'>{name}</h4>

        {character && character.segment ? (
          <div>
            <span className='person-preview__role'>{character.characters}</span>
            <br />
            <span>In Episode</span>
            <br />
            <span className='person-preview__role'>{character.segment}</span>
          </div>
        ) : Array.isArray(character) ? (
          character.map((char, index) => (
            <span key={`${name}-${index}`} className='person-preview__role'>
              {char}
            </span>
          ))
        ) : null}

        {job && <span className='person-preview__role'>{job}</span>}
      </div>
    </div>
  );
};

export default PersonPreview;
