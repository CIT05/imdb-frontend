import { useNavigate } from 'react-router';
import styles from './style.module.css';
import React from 'react';
import { Card } from 'react-bootstrap';

const BookmarkedTitleCard = ({ bookmarkedTitle }) => {
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
			onClick={() => navigate(`/title/${bookmarkedTitle.tConst}`)}
			className={`bg-dark text-light ${styles.card}`}
			border="info"
			style={{
				minHeight: '22rem',
			}}
		>
			<Card.Img
				variant="top"
				src={bookmarkedTitle.title?.poster || 'placeholder-image-url'}
				alt={bookmarkedTitle.title?.titleName || 'Image'}
				style={{
					height: '12rem',
					maxHeight: '12rem',
					objectFit: 'cover',
					objectPosition: 'center',
				}}
			/>
			<Card.Body className="d-flex flex-column justify-content-between">
				<Card.Title className="p-2 ">
					{bookmarkedTitle.title?.titleName || 'Loading...'}
				</Card.Title>
				<Card.Text className="p-2">
					{bookmarkedTitle.timestamp
						? formatTimestamp(bookmarkedTitle.timestamp)
						: 'No timestamp available'}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default BookmarkedTitleCard;
