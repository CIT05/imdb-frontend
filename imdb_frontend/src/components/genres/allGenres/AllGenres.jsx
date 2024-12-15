// @ts-nocheck
import React, { useState, useEffect } from 'react';

import './AllGenres.css';
import { Container, Row } from 'react-bootstrap';
import Loading from '../../loading/Loading';
import genreServiceInstance from '../../../services/Genres/GenresService';
import Paginator from '../../Paginator/Paginator';

const AllGenres = () => {

  const [genres, setGenres] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    genreServiceInstance.getAllGenres(pageNumber).then((data) => {
      console.log(data);
      setGenres(data);
    });
  }, [pageNumber]);

  const handlePageChange = (newPageNumber) => {
    console.log(newPageNumber);
    setPageNumber(newPageNumber);
  };

  const goToGenre = (genreId) => {
    window.location.href = `/genres/${genreId}`;
  };

    return (
      <>
      {genres && genres.items ? (
        <div className="all-genres__container">
            <Container>
                <Row>
                    <h1>All Genres ({genres.numberOfItems})</h1>
                </Row>
                {genres.items.map((genre) => {
                    return (
                        <Row key={genre.genreId} className="all-genres__genre-row" onClick={() => goToGenre(genre.genreId)}>
                            <div className='all-genres__genre-container'>
                              <span className="all-genres__genre-text">{genre.genreName}</span>
                            
                              <i className='bi bi-chevron-right all-genres__icon'>
                              </i>
                              
                            </div>
                        </Row>
                    );
                })}
                {genres.numberPages > 2 && (
                   <Row>
                   <div className='all-genres__paginator'>
                   <Paginator numberOfPages={genres.numberPages} chosenPage={pageNumber} onPageChange={handlePageChange}/>
                   </div>
                   </Row>
                )}
               
            </Container>
        </div>
    ) : (
      <Loading />
    )}
    </>
    );
}

export default AllGenres;