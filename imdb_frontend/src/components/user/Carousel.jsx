import React, { useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import styles from './style.module.css';

const Carousel = ({ ratingHistory }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const navigate = useNavigate();

	const itemsPerPage = 3;
	const totalItems = ratingHistory?.length || 0;

	const visibleItems = [
		ratingHistory[currentIndex % totalItems],
		ratingHistory[(currentIndex + 1) % totalItems],
		ratingHistory[(currentIndex + 2) % totalItems],
	].filter(Boolean); // Remove any null/undefined items.

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

	if (totalItems === 0) {
		return (
			<Container className="mt-4">
				<Row className="d-flex justify-content-center">
					<Col xs="auto">
						<p className="text-light">No ratings available.</p>
					</Col>
				</Row>
			</Container>
		);
	}

	return (
		<Container className="mt-4">
			<Row className="d-flex justify-content-between align-items-center">
				<Col xs="auto">
					<Button variant="outline-light" onClick={handlePrev}>
						<i className="bi bi-caret-left-fill"></i>
					</Button>
				</Col>
				{visibleItems.map((rating) =>
					rating && rating.title ? (
						<Col
							key={rating.tConst}
							xs={12}
							md={4}
							lg={3}
							className="d-flex justify-content-center"
						>
							<Card
								onClick={() =>
									navigate(`/title/${rating.tConst}`)
								}
								border="info"
								className={`d-flex justify-content-between bg-dark text-light ${styles.card}`}
							>
								<Card.Header>
									{rating.timestamp &&
										formatTimestamp(rating.timestamp)}
								</Card.Header>
								<Card.Body className={`${styles.cardBody}`}>
									<Card.Title className="w-100">
										<div className="d-flex justify-content-between align-items-end">
											<span>
												{rating.title.titleName ||
													'Loading...'}
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
					) : null
				)}
				<Col xs="auto">
					<Button variant="outline-light" onClick={handleNext}>
						<i className="bi bi-caret-right-fill"></i>
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Carousel;
