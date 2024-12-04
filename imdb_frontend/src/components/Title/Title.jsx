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
import 'bootstrap-icons/font/bootstrap-icons.css';

var Star = require('../../assets/star.png');

const Title = () => {
  const { tconst } = useParams();

  const [limitCast, setLimitCast] = useState(true);
  const [limitProduction, setLimitProduction] = useState(true);
  const [title, setTitle] = useState({});

  useEffect(() => {
    getTitleAndPersons(tconst).then((data) => {
      setTitle(data);
    });
  }, [tconst]);

  const handleTopCastClick = () => {
    setLimitCast(!limitCast);
  };

  const handleProductionClick = () => {
    console.log('clicked');
    setLimitProduction(!limitProduction);
  };

  return (
    <>
      {title && title.rating && title.url ? (
        <div className='title__container'>
          <Container fluid className='title__content'>
            <Row className='title__row'>
              <Col s={12} md={6}>
                <span className='title__primary-title'>
                  {title.primaryTitle}
                </span>
                <br />
                <span className='title__original-title'>
                  Original title: {title.originalTitle}
                </span>
                <ul className='list'>
                  {title.endYear ? (
                    <li
                      className='list__element'
                      key={`${title.title}-${title.startYear}`}
                    >
                      <span className='text-info title__details'>
                        {' '}
                        {title.startYear} - {title.endYear}
                      </span>
                    </li>
                  ) : (
                    <span className='text-info title__details'>
                      <li
                        key={`${title.title}-${title.endYear}`}
                        className='list__element'
                      >
                        {title.startYear}
                      </li>
                    </span>
                  )}

                  <li
                    key={`${title.runtimeMinutes}-${title.title}`}
                    className='mx-2 list__element'
                  >
                    <span className='text-info title__details'>
                      {title.runtimeMinutes} minutes
                    </span>
                  </li>
                </ul>
              </Col>
              <Col s={12} md={6}>
                <Stack direction='horizontal'>
                  {title.rating && (
                    <Stack direction='vertical'>
                      <span className='title__section-header'>Rating</span>
                      <Stack direction='horizontal'>
                        <img src={Star} className='star' alt='star' />
                        <Stack direction='vertical' className='mx-2 '>
                          <span className='title__rating'>
                            {title.rating.averageRating}
                          </span>
                          <span className='title__number-of-votes'>
                            {title.rating.numberOfVotes}
                          </span>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}

                  <Stack direction='vertical'>
                    <span className='title__section-header'>Your rating</span>
                    <Stack direction='horizontal'>
                      <i className='bi bi-star title__rate-icon'> </i>
                      <span className='title__rate-text'>Rate the title </span>
                    </Stack>
                  </Stack>
                </Stack>
              </Col>
            </Row>
            <Row>
              <Col s={12} md={6}>
                <Image key={title + '_poster'} src={title.poster} alt={title} />
                <div className='title__badge'>
                  {title.genres.map((genre) => (
                    <h5 key={genre.genreId}>
                      <Badge
                        pill
                        bg='secondary'
                        text='white'
                        className='title__badge-element'
                      >
                        {' '}
                        {genre.genreName}
                      </Badge>
                    </h5>
                  ))}
                </div>
              </Col>
              <Col s={12} md={6}>
                <p className='title__plot'>{title.plot} </p>
              </Col>
            </Row>
            <Row className='my-3'>
              <span className='title__section-header'>Directors</span>
              <div className='title__directors-and-writers mb-2'>
                <ul className='list'>
                  {title.productionPersons &&
                    title.productionPersons
                      .filter(
                        (productionPerson) => productionPerson.roleId === 37
                      )
                      .map((productionPerson) => (
                        <li
                          className='text-info list__element'
                          key={
                            productionPerson.roleId +
                            productionPerson.person.url
                          }
                        >
                          {productionPerson.person.primaryName}
                        </li>
                      ))}
                </ul>
              </div>
              <span className='title__section-header'>Writers</span>
              <div className='title__directors-and-writers'>
                <ul className='list'>
                  {title.productionPersons &&
                    title.productionPersons
                      .filter(
                        (productionPerson) => productionPerson.roleId === 28
                      )
                      .map((productionPerson) => (
                        <li
                          className='text-info list__element'
                          key={
                            productionPerson.roleId +
                            productionPerson.person.url
                          }
                        >
                          {productionPerson.person.primaryName}
                        </li>
                      ))}
                </ul>
              </div>
            </Row>
            <Row>
              <Col s={12} md={6}>
                <span className='title__section-header--large'>Top Cast</span>
                  
                <div className='title__top-cast'>
                  {title.principals &&
                  title.principals.filter(
                    (titlePrincipal) => !titlePrincipal.job
                  ).length > 4 &&
                  limitCast
                    ? title.principals
                        .filter((titlePrincipal) => !titlePrincipal.job)
                        .slice(0, 4)
                        .map((principal) => (
                          <PersonPreview
                            key={principal.url}
                            name={principal.person.primaryName}
                            character={principal.characters}
                            img={principal.person.photoUrl}
                          />
                        ))
                    : title.principals
                        .filter((titlePrincipal) => !titlePrincipal.job)
                        .map((principal) => (
                          <PersonPreview
                            key={principal.url}
                            name={principal.person.primaryName}
                            character={principal.characters}
                            img={principal.person.photoUrl}
                          />
                        ))}
                </div>
                <div className="title__cast-button" onClick={handleTopCastClick}>
                    {limitCast ? (
                      <i className='bi bi-chevron-down title__cast-button-icon'>
                        {' '}
                        Show more{' '}
                      </i>
                    ) : (
                      <i className='bi bi-chevron-up title__cast-button-icon'>
                        {' '}
                        Show less{' '}
                      </i>
                    )}
                  </div>

              
                  <span className='title__section-header--large'>
                    Production
                  </span>


                <div className='title__top-cast'>
                  {title.principals &&
                  title.principals.filter(
                    (titlePrincipal) => titlePrincipal.job && !titlePrincipal.character
                  ).length > 4 &&
                  limitProduction
                    ? title.principals
                        .filter((titlePrincipal) => titlePrincipal.job && !titlePrincipal.character)
                        .slice(0, 4)
                        .map((principal) => (
                          <PersonPreview
                            key={principal.url}
                            name={principal.person.primaryName}
                            job={principal.job}
                            img={principal.person.photoUrl}
                          />
                        ))
                    : title.principals
                        .filter((titlePrincipal) => titlePrincipal.job && !titlePrincipal.character)
                        .map((principal) => (
                          <PersonPreview
                            key={principal.url}
                            name={principal.person.primaryName}
                            job={principal.job}
                            img={principal.person.photoUrl}
                          />
                        ))}
                </div>
                <div onClick={handleProductionClick} className="title__cast-button">
                    {limitProduction ? (
                      <i className='bi bi-chevron-down title__cast-button-icon'>
                        {' '}
                        Show more{' '}
                      </i>
                    ) : (
                      <i className='bi bi-chevron-up title__cast-button-icon'>
                        {' '}
                        Show less{' '}
                      </i>
                    )}
                  </div>
       
              </Col>
              <Col s={12} md={6}>
                <span className='title__section-header--large'>Popular</span>
              </Col>
            </Row>

            {title.episodes.length > 0 && (
              <Row>
                <Col>Episodes</Col>
              </Row>
            )}
          </Container>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Title;
