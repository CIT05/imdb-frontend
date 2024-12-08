import React, { useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Carousel = ({ ratingHistory }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const navigate = useNavigate();

	const itemsPerPage = 3;
	const totalItems = ratingHistory.length;

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - itemsPerPage + totalItems) % totalItems
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalItems);
	};

	const visibleItems = [
		ratingHistory[currentIndex % totalItems],
		ratingHistory[(currentIndex + 1) % totalItems],
		ratingHistory[(currentIndex + 2) % totalItems],
	];

	console.log(ratingHistory);

	return (
		(ratingHistory && ratingHistory.length > 0 && 
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
							className="bg-dark text-light"
							style={{ width: '18rem', cursor: 'pointer' }}
						>
							<Card.Header>{rating.timestamp}</Card.Header>
							<Card.Body>
								<Card.Title>
									<div className="d-flex justify-content-between">
										<span>{rating.tConst}</span>
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
	)
)
};

export default Carousel;
