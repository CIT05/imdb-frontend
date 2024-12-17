import UserService from '../../services/User/UserService';
import { Form, Button, Stack, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import styles from './style.module.css';

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		repeatPassword: '',
		language: '',
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { languages, setLanguages } = useUserContext();

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
			await userService.signUp(userData);
			console.log('User signed up successfully:', userData);
			navigate('/login');
		} catch (err) {
			setError('An error occurred while signing up. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				const userService = new UserService();
				const languageData = await userService.fetchLanguages();
				setLanguages(languageData); // Correctly updating the state
				setLoading(false); // Optionally stop the loading state
			} catch (err) {
				console.error('Error fetching language data:', err);
				setLoading(false);
			}
		};

		fetchLanguages();
	}, [setLanguages]);

	return (
		<Container
			className={`d-flex w-50 justify-content-center align-items-center ${styles.container}`}
		>
			<Stack className="d-flex justify-content-center w-50 align-items-center text-light">
				<h1 className="align-self-start">Sign Up</h1>
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
						<Form.Label>Choose a country</Form.Label>
						<Form.Select
							name="language"
							value={formData.language}
							onChange={handleChange}
							isInvalid={!!errors.language}
						>
							<option value="">Choose a language</option>
							{languages && languages.length > 0 ? (
								languages.map((language) => (
									<option
										key={language.code}
										value={language.code}
									>
										{language.name} ({language.code})
									</option>
								))
							) : (
								<option disabled>Loading languages...</option>
							)}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.language}
						</Form.Control.Feedback>
					</Form.Group>

					<Stack>
						<Button
							disabled={loading}
							className="align-self-center w-25"
							variant="outline-info"
							type="submit"
						>
							{loading ? 'Signing Up...' : 'Sign Up'}
						</Button>
					</Stack>
				</Form>
			</Stack>
		</Container>
	);
};

export default Signup;
