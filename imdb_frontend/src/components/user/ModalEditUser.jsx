import React, { useState, useEffect } from 'react';
import UserService from '../../services/User/UserService';
import { Modal, Button, Form } from 'react-bootstrap';
import { useUserContext } from '../../contexts/UserContext';

const ModalEditUser = ({ setUserInfo, onHide, show }) => {
	const { languages, loggedInUser } = useUserContext();
	const [formData, setFormData] = useState({
		username: '',
		language: '',
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (loggedInUser) {
			const fetchUserInfo = async () => {
				const userService = new UserService();

				try {
					const data = await userService.getUserInfo(
						loggedInUser.username
					);
					setFormData({
						username: data.username || '',
						language: data.language || '',
					});
					console.log('User info fetched:', data);
				} catch (error) {
					console.error('Error fetching user info:', error);
				}
			};

			fetchUserInfo();
		}
	}, [loggedInUser]);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function validateForm() {
		const newErrors = {};

		if (!formData.username.trim()) {
			newErrors.username = 'Username is required';
		}
		if (!formData.language) {
			newErrors.language = 'Language selection is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);
		setError('');

		try {
			const userData = {
				username: formData.username,
				language: formData.language,
			};

			const userService = new UserService();
			await userService.editUser(
				userData,
				loggedInUser.userId,
				loggedInUser.token
			);
			setUserInfo((prevUserInfo) => ({
				...prevUserInfo,
				language: formData.language,
			}));
			console.log('User modified successfully:', userData);
		} catch (err) {
			setError('An error occurred while modifying. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Modal
			onHide={onHide}
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header className="bg-dark text-light" closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Edit your profile
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="bg-dark text-light">
				{error && <div className="alert alert-danger">{error}</div>}
				<Form noValidate onSubmit={handleSubmit} className="w-100">
					<Form.Group className="mb-3" controlId="formBasicUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							isInvalid={!!errors.username}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.username}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group
						className="mb-5 w-50"
						controlId="preferredLanguage"
					>
						<Form.Label>Preferred language</Form.Label>
						<Form.Select
							name="language"
							value={formData.language}
							onChange={handleChange}
							isInvalid={!!errors.language}
						>
							<option value="">
								Choose your preferred language
							</option>
							{languages.map((language) => (
								<option
									key={language.code}
									value={language.code}
								>
									{language.name}
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.language}
						</Form.Control.Feedback>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer className="bg-dark text-light">
				<Button
					disabled={loading}
					className="align-self-center w-25"
					variant="outline-info"
					type="submit"
					onClick={handleSubmit}
				>
					{loading ? 'Editing profile...' : 'Edit profile'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalEditUser;
