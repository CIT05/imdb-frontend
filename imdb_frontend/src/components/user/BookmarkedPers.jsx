import { useNavigate } from 'react-router';
import styles from './style.module.css';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { fetchPersonPhoto } from '../../services/Title/title.service';

const BookmarkedPers = ({ bookmarkedPers }) => {
	const navigate = useNavigate();
	const apiKey = process.env.REACT_APP_TMDB_API_KEY;
	const [photoUrl, setPhotoUrl] = useState(null);

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

	useEffect(() => {
		const photoUrl = `https://api.themoviedb.org/3/find/${bookmarkedPers.nConst}?external_source=imdb_id&api_key=${apiKey}`;

		const getPhoto = async () => {
			const fetchedPhotoUrl = await fetchPersonPhoto(photoUrl);
			setPhotoUrl(fetchedPhotoUrl);
		};

		getPhoto();
	}, [bookmarkedPers.nConst, apiKey]);
	return (
		<Card
			onClick={() => navigate(`/person/${bookmarkedPers.nConst}`)}
			className={`bg-dark text-light ${styles.cardPersonality}`}
			style={{}}
		>
			<Card.Body className="d-flex flex-column align-items-center justify-content-center">
				<div
					className={`d-flex justify-content-center align-items-center ${styles.circleImage}`}
				>
					{photoUrl ? (
						<img
							src={photoUrl}
							alt={bookmarkedPers.person.primaryName}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					) : (
						<i
							className="bi bi-person-circle"
							style={{ fontSize: '36px', color: '#fff' }}
						/>
					)}
				</div>

				<Card.Title className="mt-2 text-center">
					{bookmarkedPers.person.primaryName || 'Unknown'}
				</Card.Title>

				<Card.Text
					className="mt-1 text-center"
					style={{ fontSize: '0.8rem' }}
				>
					{bookmarkedPers.timestamp
						? formatTimestamp(bookmarkedPers.timestamp)
						: 'No timestamp available'}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default BookmarkedPers;
