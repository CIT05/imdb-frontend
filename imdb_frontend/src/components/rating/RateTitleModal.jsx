import React, {useState} from 'react';
import ratingServiceInstance from '../../services/Rating/ratingService';
import { Modal, Button, Form } from 'react-bootstrap';
import './RateTitleModal.css';

const RateTitleModal = ({ show, handleClose, tconst, userId, token }) => {
	const [rating, setRating] = useState(0);
	const [error, setError] = useState(false);

	const setRatingValue = (e) => {
		setRating(e.target.value);
	};

	const handleSave = async () => {
		const response = await ratingServiceInstance.saveRating(userId, tconst, rating, token);
		console.log(response);
		if (response === 200 || response === 204) {
			handleClose();
		} else {
			displayError();
		}
	};

	const displayError = () => {
		setError(true);
		setTimeout(() => {
			setError(false);
		}, 3000);
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
			contentClassName="rate-title-modal"
		>
			<Modal.Header closeButton>
				<Modal.Title>
					Rate Title
					{error && (
						<div className="error-message">
							There was a problem saving the rating. Please try
							again.
						</div>
					)}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formBasicRange">
						<Form.Label>Your rating {rating}</Form.Label>
						<Form.Control
							className="rate-title-modal"
							type="range"
							min="0"
							max="10"
							value={rating}
							onChange={setRatingValue}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleSave}>
					Save rating
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default RateTitleModal;
