// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { getTitleAndPersons } from '../../services/Title/title.service';
import './Title.css';
import PersonPreview from '../Person/PersonPreview.jsx';

var Star = require('../../assets/star.png');

const Title = () => {
  const { tconst } = useParams();
  const [title, setTitle] = useState({});

  useEffect(() => {
    getTitleAndPersons(tconst).then(data => {console.log('dataTitle', data); setTitle(data)});
  }, [tconst]);

  return (
    <>
    { title && title.rating && title.url? 
    <div className='title__container'>
    <Container fluid className='title__content'>
      <Row className="title__row">
        <Col>
          <span className="title__primary-title">{title.primaryTitle}</span>
          <br />
          <span className="title__original-title">Original title: {title.originalTitle}</span>
          <ul className="list">
            {title.endYear ? <li className="list__element" key={`${title.title}-${title.startYear}`} >
              <span className="text-info title__details"> {title.startYear} - {title.endYear}</span></li> : <span className="text-info title__details"><li  key={`${title.title}-${title.endYear}`} className="list__element">{title.startYear}</li></span>}
            
            <li key={`${title.runtimeMinutes}-${title.title}`} className="mx-2 list__element">
            <span className="text-info title__details">{title.runtimeMinutes} minutes
              </span>
            </li>
          </ul>
        </Col>
        <Col>
          <Stack direction="horizontal">
            {title.rating &&
            <Stack direction="vertical">
              <span className="title__section-header">Rating</span>
              <Stack direction="horizontal">
              <img src={Star} className='star'  alt="star"/>
              <Stack direction="vertical" className="mx-2 ">
              <span className='title__rating'>{title.rating.averageRating}</span>
              <span className="title__number-of-votes">{title.rating.numberOfVotes}</span>
              </Stack>
              </Stack>
            </Stack>
            }
             
   
            <Stack direction="vertical">
              <span className="title__section-header">Your rating</span>
              button to rate
            </Stack>
          </Stack>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
        <Image key={title + '_poster'} src={title.poster} alt={title} />
        <div className="title__badge">
          {title.genres.map((genre) => <h5 key={genre.genreId}><Badge pill  bg="secondary" text="white" className='title__badge-element'> {genre.genreName}</Badge></h5>)}
        </div>
        </Col>
        <Col >
        <p className="title__plot">{title.plot} </p>
      
        </Col>
      </Row>
      <Row>
        <Col>

        <span className="title__section-header--large">Top Cast</span>
        <div className="title__top-cast">
          {title.principals && title.principals.map((principal) => <PersonPreview key={principal.url} name={principal.person.primaryName} characters={principal.characters} img={principal.person.photoUrl} />)}
        </div>
        
        
        <span className="title__section-header--large">Production</span>
        <div>

        <span className="title__section-header">Director</span>
        { title.productionPersons &&  title.productionPersons.filter(productionPerson => productionPerson.roleId === 37).map((productionPerson) => <span key={productionPerson.roleId + productionPerson.person.url }>{productionPerson.person.primaryName}</span>)}
        </div>
        <div>
        <span className="title__section-header">Writer</span>
        {title.productionPersons && title.productionPersons.filter(productionPerson => productionPerson.roleId === 28).map((productionPerson) => <span key={productionPerson.roleId + productionPerson.person.url }>{productionPerson.person.primaryName}</span>)}
        </div>
        
        </Col>
        <Col>
        <span className="title__section-header--large">Popular</span>
        </Col>
      </Row>

      {title.episodes.length > 0 &&  <Row>
        <Col>Episodes</Col>
      </Row>}
     
    </Container>
    </div>
    : <p>Loading...</p>}
    </>
    
  );
};

export default Title;


