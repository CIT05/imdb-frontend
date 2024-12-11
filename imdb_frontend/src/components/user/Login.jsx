import { Form, Button, Stack, Container } from 'react-bootstrap';
import { useState } from 'react';
import styles from './style.module.css';
import UserService from '../../services/UserService';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';

const Login = () => {
	const [formData, setFormData] = useState({ username: '', password: '' });
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { setLoggedInUser } = useUserContext();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.username.trim()) {
			newErrors.username = 'Username is required';
		}
		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!validateForm()) return;

		setLoading(true);
		try {
			const userData = {
				username: formData.username,
				password: formData.password,
			};

			const userService = new UserService();
			const loggedInUser = await userService.logIn(userData);
			console.log('User logged in successfully:', loggedInUser);
			setLoggedInUser({
				username: loggedInUser.username,
				userId: loggedInUser.userId,
				token: loggedInUser.token,
			});
			navigate('/profile');
		} catch (err) {
			setError('An error occurred while logging in. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container
			className={`d-flex w-50 justify-content-center align-items-center ${styles.container}`}
		>
			<Stack className="d-flex justify-content-center w-50 align-items-center text-light">
				<h1 className="align-self-start">Log In</h1>
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

					<Stack>
						<Button
							disabled={loading}
							className="align-self-center w-25"
							variant="outline-info"
							type="submit"
						>
							{loading ? 'Logging In...' : 'Log In'}
						</Button>
					</Stack>
				</Form>
			</Stack>
		</Container>
	);
};

export default Login;
