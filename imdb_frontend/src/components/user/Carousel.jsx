import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { fetchTitle } from '../../services/Title/title.service';
import styles from './style.module.css';

const Carousel = ({ ratingHistory }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [titles, setTitles] = useState({});

	const navigate = useNavigate();

	const itemsPerPage = 3;
	const totalItems = ratingHistory.length;

	const visibleItems = [
		ratingHistory[currentIndex % totalItems],
		ratingHistory[(currentIndex + 1) % totalItems],
		ratingHistory[(currentIndex + 2) % totalItems],
	];

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - itemsPerPage + totalItems) % totalItems
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalItems);
	};

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);

		const formattedDate = date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
		});

		const formattedTime = date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});

		return `${formattedDate} ${formattedTime}`;
	};

	useEffect(() => {
		const fetchTitles = async () => {
			const titlePromises = visibleItems.map((item) => {
				if (!titles[item.tConst]) {
					return fetchTitle(item.tConst);
				}
				return null;
			});

			const resolvedTitles = await Promise.all(titlePromises);
			const newTitles = {};

			resolvedTitles.forEach((titleData, index) => {
				if (titleData) {
					newTitles[visibleItems[index].tConst] = titleData;
				}
			});

			setTitles((prevTitles) => ({
				...prevTitles,
				...newTitles,
			}));
		};

		fetchTitles();
	}, [ratingHistory, titles]);

	return (
		<Container className="mt-4">
			<Row className="d-flex justify-content-between align-items-center">
				<Col xs="auto">
					<Button variant="outline-light" onClick={handlePrev}>
						<i class="bi bi-caret-left-fill"></i>
					</Button>
				</Col>
				{visibleItems.map((rating) => (
					<Col
						key={rating.tConst}
						xs={12}
						md={4}
						lg={3}
						className="d-flex justify-content-center"
					>
						<Card
							onClick={() => navigate(`/title/${rating.tConst}`)}
							border="info"
							className={`d-flex justify-content-between bg-dark text-light ${styles.card}`}
						>
							<Card.Header>
								{formatTimestamp(rating.timestamp)}
							</Card.Header>
							<Card.Body className={`${styles.cardBody}`}>
								<Card.Title>
									<div className="d-flex align-items-end">
										<span>
											{titles[rating.tConst]
												?.primaryTitle || 'Loading...'}
										</span>
										<div className="d-flex align-items-center gap-1">
											<span>{rating.value}</span>
											<i className="bi bi-star-fill text-warning"></i>
										</div>
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
	);
};

export default Carousel;
