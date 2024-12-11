import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useUserContext } from '../../contexts/UserContext';
import UserService from '../../services/UserService';

const ModalEditUser = (props) => {
	const { countries, loggedInUser } = useUserContext();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		repeatPassword: '',
		language: '',
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function validateForm() {
		const newErrors = {};

		if (!formData.username.trim()) {
			newErrors.username = 'Username is required';
		}
		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}
		if (formData.password !== formData.repeatPassword) {
			newErrors.repeatPassword = 'Passwords must match';
		}
		if (!formData.language) {
			newErrors.language = 'Language selection is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	// Handle form submission
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
				password: formData.password,
				language: formData.language,
			};

			const userService = new UserService();
			await userService.editUser(userData, loggedInUser.userId);
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
			{...props}
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

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							isInvalid={!!errors.password}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group
						className="mb-3"
						controlId="formBasicRepeatPassword"
					>
						<Form.Label>Repeat Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Repeat Password"
							name="repeatPassword"
							value={formData.repeatPassword}
							onChange={handleChange}
							isInvalid={!!errors.repeatPassword}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.repeatPassword}
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
							{countries.map((country) => (
								<option key={country.code} value={country.code}>
									{country.name}
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
				>
					{loading ? 'Editing profile...' : 'Edit profile'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalEditUser;
