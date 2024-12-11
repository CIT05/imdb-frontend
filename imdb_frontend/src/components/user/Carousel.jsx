import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Carousel = ({ items, renderItem }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const itemsPerPage = 3;
	const totalItems = items?.length || 0;

	const visibleItems = [
		items[currentIndex % totalItems],
		items[(currentIndex + 1) % totalItems],
		items[(currentIndex + 2) % totalItems],
	].filter(Boolean);

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - itemsPerPage + totalItems) % totalItems
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalItems);
	};

	if (totalItems === 0) {
		return (
			<Container className="mt-4">
				<Row className="d-flex justify-content-center">
					<Col xs="auto">
						<p className="text-light">No items available.</p>
					</Col>
				</Row>
			</Container>
		);
	}

	return (
		<Container className="mt-4">
			<Row className="d-flex justify-content-between align-items-center">
				{totalItems > itemsPerPage && (
					<Col xs="auto">
						<Button variant="outline-light" onClick={handlePrev}>
							<i className="bi bi-caret-left-fill"></i>
						</Button>
					</Col>
				)}
				{visibleItems.map((item, index) => (
					<Col
						key={index}
						xs={12}
						md={4}
						lg={3}
						className="d-flex justify-content-center"
					>
						{renderItem(item)}
					</Col>
				))}
				{totalItems > itemsPerPage && (
					<Col xs="auto">
						<Button variant="outline-light" onClick={handleNext}>
							<i className="bi bi-caret-right-fill"></i>
						</Button>
					</Col>
				)}
			</Row>
		</Container>
	);
};

export default Carousel;
