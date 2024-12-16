import { useNavigate } from 'react-router';
import styles from './style.module.css';
import React from 'react';
import { Card } from 'react-bootstrap';

const RatingCard = ({ rating }) => {
	const navigate = useNavigate();

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		return `${date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
		})} ${date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		})}`;
	};

	return (
		<Card
			onClick={() => navigate(`/title/${rating.tConst}`)}
			border="info"
			className={`bg-dark text-light ${styles.card}`}
		>
			<Card.Header>
				{rating.timestamp && formatTimestamp(rating.timestamp)}
			</Card.Header>
			<Card.Body className="d-flex align-items-end">
				<Card.Title className="d-flex justify-content-between align-items-end w-100">
					<span>{rating.title?.primaryTitle || 'Loading...'}</span>
					<div className="d-flex align-items-center gap-1">
						<span>{rating.value}</span>
						<i className="bi bi-star-fill text-warning"></i>
					</div>
				</Card.Title>
			</Card.Body>
		</Card>
	);
};

export default RatingCard;
