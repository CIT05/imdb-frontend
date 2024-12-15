// @ts-nocheck
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { Badge, Row, Col } from 'react-bootstrap';
import titleService from '../../../services/Title/TitleService';

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
    titleService.getTitleAlternatives(tconst).then((data) => {
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

          <div
            className='title-alternatives__header'
            onClick={navigateToOriginalTitle}
          >
            <span className='title-alternatives__original-title'>
              Original title: {originalTitle[0].altTitle}{' '}
            </span>

            <i className='bi bi-chevron-left title-alternatives__icon'>
              Back To Original Title
            </i>
          </div>

          <div className='title-alternatives__content'>
            <Row className='title-alternatives__row'>
              <Col>
                <span className='text-bold'>Title</span>
              </Col>
              <Col>
                <span className='text-bold'>Type</span>
              </Col>
              <Col lg={1} md={1}>
                <span className='text-bold'>Region</span>
              </Col>
            </Row>
          </div>
          {otherTitles.map((alternative) => (
            <Row key={alternative.akasId} className='title-alternatives__row'>
              <Col >
                <span>{alternative.altTitle}</span>
              </Col>
              <Col >
                {alternative.types &&
                  alternative.types.map((type) => (
                    <h5 key={type.url}>
                      <Badge pill bg='secondary' text='white'>
                        {type.typeName}
                      </Badge>
                    </h5>
                  ))}
              </Col>
              <Col lg={1} md={1}>
                <span>{alternative.region}</span>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </>
  );
};

export default TitleAlternatives;
