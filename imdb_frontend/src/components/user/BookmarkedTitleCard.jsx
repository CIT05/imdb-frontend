import { useNavigate } from 'react-router';
import styles from './style.module.css';
import React from 'react';
import { Card } from 'react-bootstrap';
import UserService from '../../services/UserService';
import { useUserContext } from '../../contexts/UserContext';

const BookmarkedTitleCard = ({ bookmarkedTitle, onDelete }) => {
	const navigate = useNavigate();
	const { loggedInUser } = useUserContext();

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

	const handleDelete = async (id) => {
		try {
			const userService = new UserService();
			await userService.deleteBookmarkedPersonality(
				loggedInUser.userId,
				bookmarkedTitle.tConst,
				loggedInUser.token
			);
			console.log('Successfully deleted', id);
			onDelete(id);
		} catch (error) {
			console.error('Error deleting the bookmarked personality:', error);
		}
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
				<Card.Text className="p-2 d-flex justify-content-between">
					{bookmarkedTitle.timestamp
						? formatTimestamp(bookmarkedTitle.timestamp)
						: 'No timestamp available'}
					<button
						className="btn btn-link p-0 ms-2"
						style={{ textDecoration: 'none', color: 'inherit' }}
						onClick={(event) => {
							event.stopPropagation();
							handleDelete(bookmarkedTitle.tConst);
						}}
					>
						<i className="bi bi-trash"></i>
					</button>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default BookmarkedTitleCard;
