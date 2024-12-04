import { Form, Button, Stack, Container } from 'react-bootstrap';
import styles from './style.module.css';
import * as Yup from 'yup';
import * as formik from 'formik';
import { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

const Signup = () => {
	const { Formik } = formik;

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [countries, setCountries] = useState([]);

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
		repeatPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Repeat Password is required'),
		language: Yup.string().required('Language selection is required'),
	});

	const handleSubmit = async (values) => {
		setLoading(true);
		setError('');

		try {
			const userData = {
				username: values.email,
				password: values.password,
				language: values.language,
			};

			const userService = new UserService();
			await userService.signUp(userData);
			console.log('User signed up successfully:', userData);
		} catch (error) {
			setError('An error occurred while signing up. Please try again.');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then((response) => response.json())
			.then((data) => {
				const countryData = data
					.map((country) => ({
						name: country.name.common,
						code: country.cca2.toLowerCase(),
					}))
					.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
				setCountries(countryData);
			})
			.catch((error) =>
				console.error('Error fetching country data:', error)
			);
	}, []);

	return (
		<Container
			className={`d-flex w-50 justify-content-center align-items-center ${styles.container}`}
		>
			<Stack className="d-flex justify-content-center w-50 align-items-center text-light">
				<h1 className="align-self-start">Sign Up</h1>
				{error && <div className="alert alert-danger">{error}</div>}
				<Formik
					initialValues={{
						email: '',
						password: '',
						repeatPassword: '',
						language: '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({
						handleSubmit,
						handleChange,
						handleBlur,
						values,
						touched,
						errors,
					}) => (
						<Form
							noValidate
							onSubmit={handleSubmit}
							className="w-100"
						>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									required
									type="email"
									placeholder="Enter email"
									name="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={touched.email && !!errors.email}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
								<Form.Text className="text-light">
									Provide a valid email address
								</Form.Text>
							</Form.Group>

							<Form.Group
								className="mb-3"
								controlId="formBasicPassword"
							>
								<Form.Label>Password</Form.Label>
								<Form.Control
									required
									type="password"
									placeholder="Password"
									name="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={
										touched.password && !!errors.password
									}
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
									required
									type="password"
									placeholder="Repeat Password"
									name="repeatPassword"
									value={values.repeatPassword}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={
										touched.repeatPassword &&
										!!errors.repeatPassword
									}
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
									value={values.language}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={
										touched.language && !!errors.language
									}
								>
									<option value="">
										Choose your preferred language
									</option>
									{countries.map((country) => (
										<option
											key={country.code}
											value={country.code}
										>
											{country.name}
										</option>
									))}
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
					)}
				</Formik>
			</Stack>
		</Container>
	);
};

export default Signup;
