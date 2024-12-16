import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Stack } from 'react-bootstrap';
import { useParams } from 'react-router';
import PersonService from '../../services/PersonService';
import UserService from '../../services/UserService';
import { useUserContext } from '../../contexts/UserContext';
import Carousel from '../common/Carousel';
import KnownForCard from './KnownForCard';
import titleServiceInstance from '../../services/Title/TitleService';

const Person = () => {
	const { nconst } = useParams();
	const { loggedInUser } = useUserContext();
	const apiKey = process.env.REACT_APP_TMDB_API_KEY;

	const [person, setPerson] = useState({});
	const [photoUrl, setPhotoUrl] = useState(null);
	const [rating, setRating] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [isBookmarked, setIsBookmarked] = useState(false);

	const userService = new UserService();

	useEffect(() => {
		console.log('PERSON DATA', person);
	}, [person]);

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
	}, [loggedInUser]);

	useEffect(() => {
		if (userInfo && userInfo.personalityBookmarkings) {
			const bookmarked = userInfo.personalityBookmarkings.some(
				(bookmark) =>
					bookmark.nConst.trim().toLowerCase() ===
					nconst.trim().toLowerCase()
			);
			setIsBookmarked(bookmarked);
		}
	}, [userInfo, nconst]);

	const handleBookmarkClick = async () => {
		try {
			if (isBookmarked) {
				await userService.deleteBookmarkedPersonality(
					loggedInUser.userId,
					nconst,
					loggedInUser.token
				);
				setIsBookmarked(false);
			} else {
				await userService.addBookmarkedPersonality(
					loggedInUser.userId,
					nconst,
					loggedInUser.token
				);
				setIsBookmarked(true);
			}
		} catch (error) {
			console.error('Error toggling bookmark:', error);
		}
	};

	useEffect(() => {
		const personService = new PersonService();
		personService.getPerson(nconst).then((data) => {
			setPerson(data);
			console.log('PERSON DATA', data);
		});
	}, [nconst]);

	useEffect(() => {
		const personService = new PersonService();

		const getPhoto = async () => {
			const fetchedPhotoUrl = await titleServiceInstance.fetchPersonPhoto(
				nconst
			);
			setPhotoUrl(fetchedPhotoUrl);
		};
		const getRating = async () => {
			const rating = await personService.getRatingPerson(nconst);
			setRating(rating);
		};

		getPhoto();
		getRating();
	}, [nconst, apiKey]);

	return (
		<Container
			className="d-flex justify-content-center align-items-center flex-column my-3"
			style={{ minHeight: '100vh' }}
		>
			<Row className="w-75">
				<Col
					s={12}
					md={6}
					className="d-flex justify-content-center align-items-center flex-column"
				>
					<Image
						key={person.primaryName + '_imagePerson'}
						src={photoUrl || 'https://via.placeholder.com/150'}
						alt={person.primaryName || 'Person image'}
						style={{
							width: '100%',
							height: 'auto',
							maxWidth: '300px',
							objectFit: 'cover',
							marginBottom: '20px',
						}}
					/>
					{person &&
					person.personRoles &&
					person.personRoles.length > 0 ? (
						<div className="d-flex">
							{person.personRoles.map((personRole, index) => (
								<span
									key={index}
									className="bg-info text-dark"
									style={{
										padding: '5px 16px',
										borderRadius: '20px',
										fontSize: '14px',
										margin: 6,
									}}
								>
									{personRole.role && personRole.role.roleName
										? personRole.role.roleName
										: 'Unknown Role'}
								</span>
							))}
						</div>
					) : (
						<p>No roles available.</p>
					)}
				</Col>
				<Col s={12} md={6}>
					<Row>
						<h1 className="text-light text-start">
							{person.primaryName || 'Unknown Person'}
						</h1>
					</Row>
					<Row>
					{(person.birthYear || person.deathYear) && (
  <h3 className="text-info">
    {!person.deathYear
      ? `Birth year: ${person.birthYear}`
      : `${person.birthYear} - ${person.deathYear}`}
  </h3>
)}
					</Row>
					<Row className="bg-dark border border-info rounded p-3 d-inline-block my-3 ms-1">
						<h3 className="text-light">
							Rating: {rating}{' '}
							<i className="bi bi-star-fill text-warning"></i>
						</h3>
					</Row>
					{loggedInUser && (
						<Row>
							<Stack
								onClick={handleBookmarkClick}
								style={{
									cursor: 'pointer',
								}}
							>
								<Stack className="d-flex flex-row align-items-center gap-2">
									<span className="title__section-header">
										Bookmark
									</span>
									<i
										className={`bi ${
											isBookmarked
												? 'bi-bookmark-check-fill'
												: 'bi-bookmark-check'
										} fs-2`}
									></i>
								</Stack>
							</Stack>
						</Row>
					)}
				</Col>
			</Row>
			<Row className="w-75">
				<h1 className="text-light text-start my-3">Known For</h1>
				<Carousel
					items={person.knownFors}
					renderItem={(knownFor) => (
						<KnownForCard knownForItem={knownFor} />
					)}
				/>
			</Row>
		</Container>
	);
};

export default Person;
