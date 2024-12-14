import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import PersonService from '../../services/PersonService';
import { fetchPersonPhoto } from '../../services/Title/title.service';

const Person = () => {
	const { nconst } = useParams();
	const apiKey = process.env.REACT_APP_TMDB_API_KEY;
	const [person, setPerson] = useState({});
	const [photoUrl, setPhotoUrl] = useState(null);
	const [rating, setRating] = useState(null);

	useEffect(() => {
		const personService = new PersonService();
		personService.getPerson(nconst).then((data) => {
			setPerson(data);
			console.log('PERSON DATA', data);
		});
	}, [nconst]);

	useEffect(() => {
		const photoUrl = `https://api.themoviedb.org/3/find/${nconst}?external_source=imdb_id&api_key=${apiKey}`;
		const personService = new PersonService();

		const getPhoto = async () => {
			const fetchedPhotoUrl = await fetchPersonPhoto(nconst);
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
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: '100vh' }}
		>
			<Row className="w-75">
				<Col
					s={12}
					md={6}
					className="d-flex justify-content-center align-items-center"
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
						}}
					/>
				</Col>
				<Col s={12} md={6}>
					<Row>
						<h1 className="text-light">
							{person.primaryName || 'Unknown Person'}
						</h1>
					</Row>
					<Row>
						<h3 className="text-info">
							{person.birthYear}
							{person.deathYear ? -person.deathYear : ''}
						</h3>
					</Row>
					<Row className="bg-dark border border-info rounded p-3 d-inline-block my-3">
						<h3 className="text-light">
							Rating: {rating}{' '}
							<i className="bi bi-star-fill text-warning"></i>
						</h3>
					</Row>
					<Row>
						<Button
							variant="outline-info"
							className="w-25 mx-3 my-2"
							// onClick={() => setModalShow(true)}
						>
							Edit Profile
						</Button>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Person;