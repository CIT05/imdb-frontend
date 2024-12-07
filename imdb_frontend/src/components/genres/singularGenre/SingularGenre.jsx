// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Container,
  Row,
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Accordion,
  Offcanvas,
} from 'react-bootstrap';

import { getGenre } from '../../../services/Genres/GenresService';

import Paginator from '../../Paginator/Paginator';

import Loading from '../../loading/Loading';
import './SingularGenre.css';

const SingularGenre = () => {
  const { genreId } = useParams();
  const [genre, setGenre] = useState(null);

  const [show, setShow] = useState(false);
  const [sortType, setSortType] = useState('');

  const [maxTitlesPerPage, setMaxTitlesPerPage] = useState(8);
  const [pageNumber, setPageNumber] = useState(0);

  const [higherThan, setHigherThan] = useState(null); 
  const [lowerThan, setLowerThan] = useState(null); 

  const numberOfItems = Math.ceil(genre?.titles.length / maxTitlesPerPage);

  useEffect(() => {
    getGenre(genreId).then((data) => {
      console.log(data);
      setGenre(data);
    });
  }, [genreId]);




  const startSlice = maxTitlesPerPage * pageNumber;
  const endSlice = maxTitlesPerPage * pageNumber + maxTitlesPerPage;

  const slicedGenres = genre?.titles.slice(startSlice, endSlice);

  const handlePageChange = (newPageNumber) => {
    console.log(newPageNumber);
    setPageNumber(newPageNumber);
  };

  const navigateToAllGenres = () => {
    window.location.href = '/genres';
  };

  const navigateToTitle = (url) => {
    const tconst = url.split('/').pop();
    window.location.href = `/title/${tconst}`;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleHigherThanChange = (e) => {
    setHigherThan(e.target.value);
  
  };

  const handleLowerThanChange = (e) => {
    setLowerThan(e.target.value);

  };

  const handleReset = () => {
    setHigherThan(null);
    setLowerThan(null);
    setSortType('');
  };

  const handleSortChange = (sortType) => {
    setSortType(sortType);
    switch (sortType) {
      case 'titleAZ':
        setGenre({
          ...genre,
          titles: genre.titles.sort((a, b) =>
            a.primaryTitle.localeCompare(b.primaryTitle)
          ),
        });
        setPageNumber(0);
        break;
      case 'titleZA':
        setGenre({
          ...genre,
          titles: genre.titles.sort((a, b) =>
            b.primaryTitle.localeCompare(a.primaryTitle)
          ),
        });
        setPageNumber(0);
        break;
      case 'ratingLH':
        setGenre({
          ...genre,
          titles: genre.titles.sort(
            (a, b) =>
              (a.rating ? a.rating.averageRating : 0) -
              (b.rating ? b.rating.averageRating : 0)
          ),
        });
        setPageNumber(0);

        break;
      case 'ratingHL':
        setGenre({
          ...genre,
          titles: genre.titles.sort(
            (a, b) =>
              (b.rating ? b.rating.averageRating : 0) -
              (a.rating ? a.rating.averageRating : 0)
          ),
        });
        setPageNumber(0);
        break;
      default:
          setGenre({
            ...genre,
            titles: genre.titles.sort((a, b) =>
              a.url.slice('/').pop() - b.url.slice('/').pop()
            ),
          });
        break;
    }
  };

  return (
    <>
      {genre ? (
        <div className='singular-genres__container'>
          <Container>
            <Row>
              <div className='singular-genres__header'>
                <i
                  className='bi bi-chevron-left singular-genres__icon'
                  onClick={navigateToAllGenres}
                >
                  Back To All Genres
                </i>

                <div className='singular-genres__filtering'>
                  <i
                    className='bi bi-filter singular-genres__icon'
                    onClick={handleShow}
                  >
                    Filter and Sort
                  </i>
                </div>
              </div>
            </Row>
            <Row>
              <h1>
                {genre.genreName} <span>({genre.titles.length})</span>
              </h1>
            </Row>
            <Row>
              <div className='singular-genres__titles'>
                {slicedGenres.map((title) => (
                  <Card key={title.tconst} className='singular-genres__title'>
                    <Card.Img
                      variant='top'
                      className='singular-genres__image'
                      src={title.poster}
                      alt={'No photo'}
                    />
                    <Card.Body>
                      <Card.Title>{title.primaryTitle}</Card.Title>
                      <Card.Text>
                        <i className='bi bi-star-fill singular-genres-icon'>
                          {' '}
                        </i>
                        {title.rating ? title.rating.averageRating : 'N/A'}{' '}
                        <br />
                      </Card.Text>
                    </Card.Body>
                    <Card.Body>
                      <Button
                        className='singular-genres__button'
                        variant='info'
                        onClick={() => navigateToTitle(title.url)}
                      >
                        See the title
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Row>
            <Row>
              <div className='singular-genres__paginator'>
                <Paginator
                  numberOfPages={numberOfItems}
                  chosenPage={pageNumber}
                  onPageChange={handlePageChange}
                />
              </div>
            </Row>
          </Container>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filter and sort</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <Button onClick={handleReset} style={{ marginBottom: '1rem' }}>Reset</Button>
              <Accordion defaultActiveKey='0'>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>Sort By</Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Form.Check>
                        <Form.Check.Input
                          type='radio'
                          name='sort'
                          value='titleAZ'
                          checked={sortType === 'titleAZ'}
                          onClick={() => handleSortChange('titleAZ')}
                        />
                        <Form.Check.Label>{'Title A -> Z'}</Form.Check.Label>
                      </Form.Check>
                      <Form.Check>
                        <Form.Check.Input
                          type='radio'
                          name='sort'
                          value='titleZA'
                          checked={sortType === 'titleZA'}
                          onClick={() => handleSortChange('titleZA')}
                        />
                        <Form.Check.Label>{'Title Z -> A'}</Form.Check.Label>
                      </Form.Check>
                      <Form.Check>
                        <Form.Check.Input
                          type='radio'
                          name='sort'
                          value='ratingLH'
                          checked={sortType === 'ratingLH'}
                          onClick={() => handleSortChange('ratingLH')}
                        />
                        <Form.Check.Label>
                          {'Rating Low -> High'}
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check>
                        <Form.Check.Input
                          type='radio'
                          name='sort'
                          value='ratingHL'
                          checked={sortType === 'ratingHL'}
                          onClick={() => handleSortChange('ratingHL')}
                        />
                        <Form.Check.Label>
                          {'Rating High -> Low'}
                        </Form.Check.Label>
                      </Form.Check>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>Filter By</Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Form.Group className='mb-3' controlId='formBasicRange'>
                        <Form.Label>Rating higher or equal than {higherThan}</Form.Label>
                        <Form.Control
                          type='range'
                          min='0'
                          max='10'
                          value={higherThan}
                          onChange={handleHigherThanChange}
                        />
                        <Form.Label>Rating lower or equal than {lowerThan}</Form.Label>
                        <Form.Control 
                        type='range'
                        min='0'
                        max='10'
                        value={lowerThan}
                        onChange={handleLowerThanChange}
                        />
                      </Form.Group>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SingularGenre;
