import React from "react";
import './PersonPreview.css';
import Image from 'react-bootstrap/Image';

const PersonPreview = ({name, characters, img}) => {

  return (
    <div className="person-preview">
      <Image src={img} alt={name} className="person-preview__photo" roundedCircle />
      <div className="person-preview__info">
        <h4 className="person-preview__name">{name}</h4>
        {characters && characters.map((character) => (
            <span key={name+character} className="person-preview__role">{character}</span>
          ))}
      </div>
      </div>
  );
};


export default PersonPreview;