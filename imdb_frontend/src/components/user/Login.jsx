import { Form, Button, Stack, Container } from 'react-bootstrap';
import styles from './style.module.css';
import * as Yup from 'yup';
import * as formik from 'formik';
import { useState } from 'react';
import UserService from '../../services/UserService';
import { useUserContext } from '../../contexts/UserContext';

const Login = () => {
	const { Formik } = formik;

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { setLoggedInUser } = useUserContext();

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required'),
	});

	const handleSubmit = async (values) => {
		setLoading(true);
		setError('');

		try {
			const userData = {
				username: values.email,
				password: values.password,
			};

			const userService = new UserService();
			await userService.logIn(userData);
			console.log('User logged in successfully:', userData);
			setLoggedInUser(userData.username);
		} catch (error) {
			setError('An error occurred while logging in. Please try again.');
			console.error(error);
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
				<Formik
					initialValues={{
						email: '',
						password: '',
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
									Provide the email address you signed up with
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
					)}
				</Formik>
			</Stack>
		</Container>
	);
};

export default Login;
