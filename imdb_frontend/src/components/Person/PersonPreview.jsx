import React from "react";
import './PersonPreview.css';
import Image from 'react-bootstrap/Image';
import 'bootstrap-icons/font/bootstrap-icons.css';


const PersonPreview = ({name, character, job, img}) => {

  return (
    <div className="person-preview">
      {img ? <Image src={img} alt={name} className="person-preview__photo" roundedCircle /> : <i className="bi bi-person-circle person-preview__photo-blank"></i>}
      <div className="person-preview__info">
        <h4 className="person-preview__name">{name}</h4>
        {character && character.map((character) => (
            <span key={name+character} className="person-preview__role">{character}</span>
          ))}
        {job && <span className="person-preview__role">{job}</span>}
      </div>
      </div>
  );
};


export default PersonPreview;