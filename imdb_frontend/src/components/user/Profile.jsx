import { Container, Stack } from 'react-bootstrap';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { Image, Button, Row, Col } from 'react-bootstrap';
import Carousel from '../common/Carousel';
import RatingCard from './RatingCard';
import BookmarkedTitleCard from './BookmarkedTitleCard';
import BookmarkedPers from './BookmarkedPers';
import ModalEditUser from './ModalEditUser';
import { useNavigate } from 'react-router';

const Profile = () => {
	const { loggedInUser } = useUserContext();
	const navigate = useNavigate();

	const [userInfo, setUserInfo] = useState(null);
	const [modalShow, setModalShow] = useState(false);
	const { languages, setLanguages } = useUserContext();
	const randomSeed = Math.random().toString(36).substring(7);

	const handleLogout = () => {
		localStorage.removeItem('loggedInUser');
		navigate('/login');
	};

	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				const userService = new UserService();
				const languageData = await userService.fetchLanguages();
				setLanguages(languageData);
			} catch (err) {
				console.error('Error fetching language data:', err);
			}
		};

		fetchLanguages();
	}, []);

	useEffect(() => {
		if (loggedInUser) {
			const fetchUserInfo = async () => {
				const userService = new UserService();

				try {
					const data = await userService.getUserInfo(
						loggedInUser.username
					);
					setUserInfo(data);
					console.log('User info fetched:', data);
				} catch (error) {
					console.error('Error fetching user info:', error);
				}
			};

			fetchUserInfo();
		}
	}, [loggedInUser, userInfo?.language]);

	const handlePersonalityDelete = (deletedId) => {
		setUserInfo((prevUserInfo) => ({
			...prevUserInfo,
			personalityBookmarkings:
				prevUserInfo.personalityBookmarkings.filter(
					(item) => item.nConst !== deletedId
				),
		}));
	};

	const handleTitleDelete = (deletedId) => {
		setUserInfo((prevUserInfo) => ({
			...prevUserInfo,
			titleBookmarkings: prevUserInfo.titleBookmarkings.filter(
				(item) => item.tConst !== deletedId
			),
		}));
	};

	useEffect(() => {
		console.log('user info', userInfo);
	}, [userInfo]);

	return (
		<Container className="d-flex w-75 my-3 justify-content-center align-items-center text-light">
			{userInfo ? (
				<Container className=" my-3 justify-content-between text-light">
					{userInfo ? (
						<Container>
							<Row className="mb-4">
								<Col>
									<h1 className="text-start">Profile</h1>
								</Col>
							</Row>

							<Row className="justify-content-between">
								<Col md={4}>
									<Image
										className="w-100 h-100"
										src={`https://robohash.org/${randomSeed}.png`}
										rounded
									/>
								</Col>

								<Col className="p-0" md={7}>
									<Row>
										<h2>Welcome IMDB Member</h2>
									</Row>
									<Row>
										<h4>Username: {userInfo.username}</h4>
									</Row>
									<Row>
										<p>
											Language preference:{' '}
											{userInfo.language}
										</p>
									</Row>
									<Row className="d-flex flex-column">
										<Button
											variant="outline-info"
											className="w-25 mx-3 my-2"
											onClick={() => setModalShow(true)}
										>
											Edit Profile
										</Button>
										<Button
											variant="danger"
											className="w-25 mx-3 my-2"
											onClick={handleLogout}
										>
											Log out
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
									items={userInfo.ratingHistory}
									renderItem={(rating) => (
										<RatingCard rating={rating} />
									)}
								/>
							</Row>
							<Row className="mt-5">
								<Col>
									<h2>Your bookmarked titles</h2>
								</Col>
							</Row>
							<Row>
								<Carousel
									items={userInfo.titleBookmarkings}
									renderItem={(bookmarkedTitle) => (
										<BookmarkedTitleCard
											bookmarkedTitle={bookmarkedTitle}
											onDelete={handleTitleDelete}
										/>
									)}
								/>
							</Row>
							<Row className="mt-5">
								<Col>
									<h2>Your bookmarked persons</h2>
								</Col>
							</Row>
							<Row>
								<Carousel
									items={userInfo.personalityBookmarkings}
									renderItem={(bookmarkedPers) => (
										<BookmarkedPers
											bookmarkedPers={bookmarkedPers}
											onDelete={handlePersonalityDelete}
										/>
									)}
								/>
							</Row>
						</Container>
					) : (
						<>
							<h1 className="text-light">Please log in</h1>
							<Button
								variant="info"
								onClick={() => navigate('/login')}
							>
								Go to login
							</Button>
						</>
					)}
					<ModalEditUser
						show={modalShow}
						setUserInfo={setUserInfo}
						onHide={() => setModalShow(false)}
					/>
				</Container>
			) : (
				<Stack
					className="align-items-center justify-content-center gap-3"
					style={{ minHeight: '50vh' }}
				>
					<h1 className="text-light">
						In order to access this page please log in first. If you
						don't have an account, sign up.
					</h1>
					<Button variant="info" onClick={() => navigate('/login')}>
						Log in
					</Button>
					<Button variant="info" onClick={() => navigate('/signup')}>
						Sign up
					</Button>
				</Stack>
			)}
		</Container>
	);
};

export default Profile;
