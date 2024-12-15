import React, { useEffect, useState, useMemo } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Star from '../../assets/star.png';
import AllGenres from '../genres/allGenres/AllGenres';
import PersonService from '../../services/PersonService';
import { fetchAllTitles, fetchPersonPhoto } from '../../services/Title/title.service';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import style from './IMDBRoot.module.css';

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const getPopularItems = (items, sortField, limit, fallbackValue = 0) =>
    items
        .sort((a, b) => (b[sortField] || fallbackValue) - (a[sortField] || fallbackValue))
        .slice(0, limit);

const PlaceholderImage = 'https://via.placeholder.com/150';

const ItemCard = ({ item, onClick, type }) => {
    const { primaryTitle, poster, rating, photoUrl, birthYear, deathYear } = item;
    const displayImage = type === 'movie' ? poster || PlaceholderImage : photoUrl || PlaceholderImage;

    return (
        <Card
            onClick={onClick}
            className="bg-dark text-light"
            style={{ width: '18rem', height: '18rem', cursor: 'pointer' }}
        >
            <Card.Img
                style={{ width: '100%', height: '10rem', objectFit: 'cover' }}
                variant="top"
                src={displayImage}
            />
            <Card.Header>{primaryTitle || item.primaryName}</Card.Header>
            <Card.Body>
                <Card.Title>
                    <div className="d-flex justify-content-between">
                        {type === 'movie' ? (
                            <p>
                                Rating: {rating?.averageRating || 'N/A'}{' '}
                                <i className="bi bi-star-fill text-warning"></i>
                            </p>
                        ) : (
                            <p>
                                {birthYear} - {deathYear || ''}
                            </p>
                        )}
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

const SectionCarousel = ({ title, items, currentIndex, setCurrentIndex, type, onNavigate }) => {
    const itemsPerPage = 3;
    const totalItems = items.length;

    const visibleItems = useMemo(() => {
        if (totalItems === 0) return [];
        return [
            items[currentIndex % totalItems],
            items[(currentIndex + 1) % totalItems],
            items[(currentIndex + 2) % totalItems],
        ];
    }, [currentIndex, items, totalItems]);

    const handlePrev = () => setCurrentIndex((prev) => (prev - itemsPerPage + totalItems) % totalItems);
    const handleNext = () => setCurrentIndex((prev) => (prev + itemsPerPage) % totalItems);

    return (
        <section className={style.sectionLayout}>
            <h2 className={style.h2}>{title}</h2>
            <Container className="mt-4" >
                <Row className="d-flex justify-content-between align-items-center">
                    <Col xs="auto">
                        <Button variant="outline-light" onClick={handlePrev}>
                            <i className="bi bi-caret-left-fill"></i>
                        </Button>
                    </Col>
                    {visibleItems.map((item) => (
                        <Col
                            key={item.tConst}
                            xs={12}
                            md={4}
                            lg={3}
                            className="d-flex justify-content-center"
                        >
                            <ItemCard
                                item={item}
                                type={type}
                                onClick={() => onNavigate(item.url?.split('/').pop())}
                            />
                        </Col>
                    ))}
                    <Col xs="auto">
                        <Button variant="outline-light" onClick={handleNext}>
                            <i className="bi bi-caret-right-fill"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

const IMDBRoot = () => {
    const [titles, setTitles] = useState([]);
    const [luckyTitles, setLuckyTitles] = useState([]);
    const [popularTitles, setPopularTitles] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    const [celebs, setCelebs] = useState([]);
    const [currentCelebIndex, setCurrentCelebIndex] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        const getTitles = async () => {
            const allTitles = await fetchAllTitles();
            setTitles(getPopularItems(allTitles.items, 'startYear', 5));
            setLuckyTitles(shuffleArray(allTitles.items).slice(0, 5));
            setPopularTitles(getPopularItems(allTitles.items, 'rating.averageRating', 10));
        };
        getTitles();
    }, []);

    useEffect(() => {
        const fetchCelebs = async () => {
            const personService = new PersonService();
            const data = await personService.getAllPersons();
            const updatedCelebs = await Promise.all(
                data.items.map(async (celeb) => {
                    const id = celeb.url.split('/').pop();
                    const photo = await fetchPersonPhoto(id);
                    return {
                        ...celeb,
                        photoUrl: photo || null,
                    };
                })
            );
            setCelebs(getPopularItems(updatedCelebs, 'personRoles.length', 10, 0));
        };
        fetchCelebs();
    }, []);

    return (
        <>
            <section className={style.layout}>
                <Carousel className={style.carousel} fade>
                    {titles.map((title, index) => (
                        <Carousel.Item key={index} interval={1000}>
                            <picture>
                                {title.poster && (
                                    <img
                                        style={{ display: 'block', margin: 'auto' }}
                                        src={title.poster || PlaceholderImage}
                                        alt={title.primaryTitle}
                                    />
                                )}
                            </picture>
                            <Carousel.Caption className={style.labelTitle}>
                                <h5>{title.primaryTitle}</h5>
                                <div>
                                    {title.rating.averageRating || ''}{' '}
                                    <img src={Star} className="star" alt="star" />
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className={style.title}>
                    <h1>WORLD OF MOVIES</h1>
                    <h2 className={style.h2}>IMDb</h2>
                </div>
            </section>

            <SectionCarousel
                title="Most Popular Celebs"
                items={celebs}
                currentIndex={currentCelebIndex}
                setCurrentIndex={setCurrentCelebIndex}
                type="celeb"
                onNavigate={(id) => navigate(`/person/${id}`)}
            />

            <SectionCarousel
                title="Most Popular Movies"
                items={popularTitles}
                currentIndex={currentMovieIndex}
                setCurrentIndex={setCurrentMovieIndex}
                type="movie"
                onNavigate={(id) => navigate(`/title/${id}`)}
            />

            <section>
                <h2 className={style.h2}>
                    Get lucky <i className="bi bi-emoji-laughing-fill"></i>
                </h2>
                <div className={style.flexContainer}>
                    {luckyTitles.map((luckyTitle) => (
                        <ItemCard
                            key={luckyTitle.tConst}
                            item={luckyTitle}
                            type="movie"
                            onClick={() => navigate(`/title/${luckyTitle.url?.split('/').pop()}`)}
                        />
                    ))}
                </div>
            </section>

            <section>
                <AllGenres />
            </section>
        </>
    );
};

export default IMDBRoot;