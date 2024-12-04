import { Container } from 'react-bootstrap';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { Image, Button, Row, Col } from 'react-bootstrap';
import Carousel from './Carousel';

const Profile = () => {
	const { loggedInUser } = useUserContext();

	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		if (loggedInUser) {
			const fetchUserInfo = async () => {
				const userService = new UserService();

				try {
					const data = await userService.getUserInfo(loggedInUser);
					setUserInfo(data);
					console.log('User info fetched:', data);
				} catch (error) {
					console.error('Error fetching user info:', error);
				}
			};

			fetchUserInfo();
		}
	}, [loggedInUser]);

	return (
		<Container className="d-flex w-75 my-3 justify-content-center align-items-center text-light">
			{userInfo ? (
				<Container className=" my-3 justify-content-between text-light">
					{userInfo ? (
						<Container>
							<Row className="mb-4">
								<Col>
									<h1>Profile</h1>
								</Col>
							</Row>

							<Row className="justify-content-between">
								<Col md={4}>
									<Image
										className="w-100"
										src="https://picsum.photos/171/180"
										rounded
									/>
								</Col>

								<Col md={7}>
									<Row>
										<h2 className="p-0">
											Welcome, {loggedInUser}
										</h2>
									</Row>
									<Row>
										<Button
											variant="outline-info"
											className="w-25 my-2"
										>
											Edit Profile
										</Button>
									</Row>
									<Row>
										<Button
											variant="outline-danger"
											className="w-25 my-2"
										>
											Delete Account
										</Button>
									</Row>
								</Col>
							</Row>

							<Row className="mt-5">
								<Col>
									<h2>Rating History</h2>
								</Col>
							</Row>

							<Row>
								<Carousel
									ratingHistory={userInfo.ratingHistory}
								/>
							</Row>
						</Container>
					) : (
						<h1 className="text-light">Please log in</h1>
					)}
				</Container>
			) : (
				<h1 className="text-light">Please log in</h1>
			)}
		</Container>
	);
};

export default Profile;
