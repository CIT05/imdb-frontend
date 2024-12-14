import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Carousel = ({ items, renderItem }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const itemsPerPage = 3;
	const totalItems = items?.length || 0;

	useEffect(() => {
		if (currentIndex >= totalItems) {
			setCurrentIndex(0);
		}
	}, [items, currentIndex, totalItems]);

	const visibleItems =
		totalItems >= itemsPerPage
			? [
					items[currentIndex % totalItems],
					items[(currentIndex + 1) % totalItems],
					items[(currentIndex + 2) % totalItems],
			  ]
			: items;

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + totalItems) % totalItems
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
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
			<Row
				className={`d-flex ${
					totalItems < itemsPerPage
						? 'justify-content-start'
						: 'justify-content-around'
				} align-items-center`}
				key={items.length}
			>
				{totalItems >= itemsPerPage && (
					<Col xs="auto">
						<Button variant="outline-light" onClick={handlePrev}>
							<i className="bi bi-caret-left-fill"></i>
						</Button>
					</Col>
				)}

				{visibleItems.map((item, index) => (
					<Col
						key={`item-${item.nConst}-${index}`}
						xs={12}
						md={4}
						lg={3}
						className="d-flex justify-content-center"
					>
						{renderItem(item)}
					</Col>
				))}

				{totalItems >= itemsPerPage && (
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
