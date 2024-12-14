import React, { useEffect, useState, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Star from '../../assets/star.png';
import AllGenres from '../genres/allGenres/AllGenres';
import { fetchAllTitles } from '../../services/Title/title.service';
import {  Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import style from './IMDBRoot.module.css';


    const IMDBRoot = () => {
        const [titles, setTitles] = useState([]);
        const [popularTitles, setPopularTitles] = useState([]);
        const [currentIndex, setCurrentIndex] = useState(0);

        const navigate = useNavigate();
        
        useEffect(() => {
            const getTitles = async () => {
            const allTitles = await fetchAllTitles();
            const sortedTitles = allTitles.items.sort((a, b) => b.startYear - a.startYear);
            setTitles(sortedTitles.slice(0, 5));
            console.log('titles', sortedTitles);

            setPopularTitles(getPopularTitles(allTitles.items));
            console.log('popularTitles', getPopularTitles(allTitles.items));
            };
            getTitles();
        }, []);

        const getPopularTitles = (titles) => {
            return titles
                .sort((a, b) => b.rating?.averageRating - a.rating?.averageRating)
                .slice(0, 10);
        };


        const itemsPerPage = 3;
        const totalItems = popularTitles.length;

        const handlePrev = () => {
            setCurrentIndex(
                (prevIndex) => (prevIndex - itemsPerPage + totalItems) % totalItems
            );
        };
    
        const handleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalItems);
        };
    
        const visibleItems = useMemo(() => {
            if (totalItems === 0) return []; // Guard against empty `popularTitles`
            return [
                popularTitles[currentIndex % totalItems],
                popularTitles[(currentIndex + 1) % totalItems],
                popularTitles[(currentIndex + 2) % totalItems],
            ];
        }, [currentIndex, popularTitles, totalItems]);
        
        return (
            <>
            <section className={style.layout}>
                  <Carousel className={style.carousel} fade >
            {titles.map((title, index) => (
   
            <Carousel.Item key={index} interval={1000} >
            <picture>
                {title.poster && <img style={{display: 'block', margin: 'auto'}} src={title.poster} alt={title.primaryTitle} />}
            </picture>
              <Carousel.Caption className={style.labelTitle}>
                <h5>{title.primaryTitle}</h5>
                <div>{title.rating.averageRating || ''} <img src={Star} className='star' alt='star' /></div>
              </Carousel.Caption>
            </Carousel.Item>

               ))}
                    </Carousel>
                    <div className={style.title}>
                    <h1>WORLD OF MOVIES</h1>
                    <h2>IMDb</h2>
                    </div>
            </section>


<section className={style.sectionLayout}>

    <h2>Most popular movies</h2>
            <Container className="mt-4">

            <Row className="d-flex justify-content-between align-items-center">
            <Col xs="auto">
                   <Button variant="outline-light" onClick={handlePrev}>
                                    <i class="bi bi-caret-left-fill"></i>
                                </Button>
                            </Col>
            {visibleItems.map((movie) => (
					<Col
						key={movie.tConst}
						xs={12}
						md={4}
						lg={3}
						className="d-flex justify-content-center"
					>
						<Card
							onClick={() => navigate(`/title/${movie.tConst}`)}
						  variant="flush"
							className="bg-dark text-light"
							style={{ width: '18rem', height:'18rem', cursor: 'pointer' }}
						>
                            {movie.poster && movie.poster !== 'N/A' ? <Card.Img style={{ width: '100%', height:'10rem', objectFit: 'cover' }} variant="top" src={movie.poster}/> : <Card.Img style={{ width: '100%', height:'10rem', objectFit: 'cover' }} variant="top" src={`https://picsum.photos/200/300?random=${movie.tConst}`} /> }
  
							<Card.Header>{movie.primaryTitle}</Card.Header>
							<Card.Body>
								<Card.Title>
									<div className="d-flex justify-content-between">
										<p>Rating: {movie.rating?.averageRating || ''} <i className="bi bi-star-fill text-warning"></i></p>	
									</div>
								</Card.Title>
                          
							</Card.Body>
						</Card>
					</Col>
				))}
                <Col xs="auto">
					<Button variant="outline-light" onClick={handleNext}>
						<i class="bi bi-caret-right-fill"></i>
					</Button>
				</Col>
                </Row>
                
</Container>
</section>

<section>
    <h2>Get lucky <i className="bi bi-emoji-laughing-fill"></i></h2>
<div className={style.flexContainer}>
        {titles
            .sort(() =>  Math.random() - 0.5)
            .slice(0, 5)
            .map((title) => (
                <Card
                    key={title.tConst}
                    onClick={() => navigate(`/title/${title.tConst}`)}
                    variant="flush"
                    className="bg-dark text-light"
                    style={{ width: '18rem', height: '18rem', cursor: 'pointer' }}
                >
                    {title.poster && title.poster !== 'N/A' ? (
                        <Card.Img
                            style={{ width: '100%', height: '10rem', objectFit: 'cover' }}
                            variant="top"
                            src={title.poster}
                        />
                    ) : (
                        <Card.Img
                            style={{ width: '100%', height: '10rem', objectFit: 'cover' }}
                            variant="top"
                            src={`https://picsum.photos/200/300?random=${title.tConst}`}
                        />
                    )}

                    <Card.Header>{title.primaryTitle}</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <div className="d-flex justify-content-between">
                                <p>
                                    Rating: {title.rating?.averageRating || ''}{' '}
                                    <i className="bi bi-star-fill text-warning"></i>
                                </p>
                            </div>
                        </Card.Title>
                    </Card.Body>
                </Card>
            ))}


</div>
</section>

<section>
    <AllGenres/>
</section>
</>

        );
    };

    export default IMDBRoot;