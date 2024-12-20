import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import titleServiceInstance from '../../services/Title/TitleService.js';
import PersonPreview from '../person/PersonPreview.jsx';
import Episode from './Episode/Episode.jsx';
import Loading from '../loading/Loading.jsx';
import RateTitleModal from '../rating/RateTitleModal.jsx';
import UserService from '../../services/User/UserService.js';
import Star from '../../assets/star.png';
import { Stack, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useUserContext } from '../../contexts/UserContext.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Title.css';

const Title = () => {
	const { tconst } = useParams();

	const [limitCast, setLimitCast] = useState(true);
	const [limitProduction, setLimitProduction] = useState(true);
	const [limitKnownFor, setLimitKnownFor] = useState(true);
	const [limitDirectors, setLimitDirectors] = useState(true);
	const [limitWriters, setLimitWriters] = useState(true);
	const [episodeFirstIndex, setEpisodeFirstIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const { loggedInUser } = useUserContext();
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	const [title, setTitle] = useState({});
	const [userInfo, setUserInfo] = useState(null);
	const userService = new UserService();

  useEffect(() => {
		setIsLoaded(false);
    	titleServiceInstance.getTitleAndPersons(tconst).then((data) => {
      setTitle(data);
			setIsLoaded(true);
    });
  }, [tconst]);

	useEffect(() => {
		if (loggedInUser) {
			const fetchUserInfo = async () => {
				const userService = new UserService();

				try {
					const data = await userService.getUserInfo(
						loggedInUser.username
					);
					setUserInfo(data);
				} catch (error) {
					console.error('Error fetching user info:', error);
				}
			};

			fetchUserInfo();
		}
	}, [loggedInUser]);

	useEffect(() => {
		if (loggedInUser && userInfo && userInfo.titleBookmarkings) {
			const bookmarked = userInfo.titleBookmarkings.some(
				(bookmark) =>
					bookmark.tConst.trim().toLowerCase() ===
					tconst.trim().toLowerCase()
			);
			setIsBookmarked(bookmarked);
		}
	}, [userInfo, tconst, loggedInUser]);

	const handleBookmarkClick = async () => {
		try {
			if (isBookmarked) {
				await userService.deleteBookmarkedTitle(
					loggedInUser.userId,
					tconst,
					loggedInUser.token
				);
				setIsBookmarked(false);
			} else {
				await userService.addBookmarkedTitle(
					loggedInUser.userId,
					tconst,
					loggedInUser.token
				);
				setIsBookmarked(true);
			}
		} catch (error) {
			console.error('Error toggling bookmark:', error);
		}
	};

	const handleTopCastClick = () => {
		setLimitCast(!limitCast);
	};

	const handleProductionClick = () => {
		setLimitProduction(!limitProduction);
	};

	const handleKnownForClick = () => {
		setLimitKnownFor(!limitKnownFor);
	};

	const handleDirectorsClick = () => {
		setLimitDirectors(!limitDirectors);
	};

	const handleWritersClick = () => {
		setLimitWriters(!limitWriters);
	};

	const handleNextEpisode = () => {
		const episodesLength = title.episodes.length;
		if (episodeFirstIndex + 3 >= episodesLength) {
			setEpisodeFirstIndex(episodesLength - 1);
		} else {
			setEpisodeFirstIndex(episodeFirstIndex + 3);
		}
	};

  const rateTitle = () => {
    if (loggedInUser) setShowModal(true);
    else window.location.href = '/login';
  }
	const handlePreviousEpisode = () => {
		if (episodeFirstIndex - 3 < 0) {
			setEpisodeFirstIndex(0);
		} else {
			setEpisodeFirstIndex(episodeFirstIndex - 3);
		}
	};

	const goToTitlePage = (tconst) => {
		window.location.href = `/title/${tconst}`;
	};

	const goToPerson = (nconst) => {
		window.location.href = `/person/${nconst}`;
	};

	const goToGenre = (genreId) => {
		window.location.href = `/genres/${genreId}`;
	};

	const navigateToAlternative = (url) => {
		const tconst = url.split('/').pop();
		window.location.href = `/title/alternative/${tconst}`;
	};

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<>
			{isLoaded && title ? (
				<>
					<div className="title__container">
					{title.url && title.status !== 400 ? (
							<Container fluid className="title__content">
								<Row className="title__row">
									<Col>
										<span className="title__primary-title">
											{title.primaryTitle}
										</span>
										<br />
										<span className="title__original-title">
											Original title:{' '}
											{title.originalTitle}
										</span>
										<ul className="list">
											{title.endYear ? (
												<li
													className="list__element"
													key={`${title.title}-${title.startYear}`}
												>
													<span className="text-info title__details">
														{' '}
														{title.startYear} -{' '}
														{title.endYear}
													</span>
												</li>
											) : (
												<span className="text-info title__details">
													<li
														key={`${title.title}-${title.endYear}`}
														className="list__element"
													>
														{title.startYear}
													</li>
												</span>
											)}

											<li
												key={`${title.runtimeMinutes}-${title.title}`}
												className="mx-2 list__element"
											>
												<span className="text-info title__details">
													{title.runtimeMinutes}{' '}
													minutes
												</span>
											</li>
										</ul>
									</Col>
									<Col>
										<div
											className="title__alternatives"
											onClick={() =>
												navigateToAlternative(title.url)
											}
										>
											<span className="title__original-title">
												See alternative titles
											</span>
											<i className="bi bi-chevron-right title__cast-button-icon" />
										</div>
									</Col>
								</Row>
								<Row>
									<Col s={12} md={6}>
										<Image
											key={title + '_poster'}
											src={title.poster}
											alt={title}
										/>
										<div className="title__badge">
											{title.genres.map((genre) => (
												<h5 key={genre.genreId}>
													<Badge
														pill
														bg="secondary"
														text="white"
														className="title__badge-element"
														onClick={() =>
															goToGenre(
																genre.genreId
															)
														}
													>
														{' '}
														{genre.genreName}
													</Badge>
												</h5>
											))}
										</div>
									</Col>
									<Col s={12} md={6}>
										<Col s={12} md={6}>
											<Stack
												direction="horizontal"
												className="title__rating-container"
											>
												{title.rating && (
													<Stack direction="vertical">
														<span className="title__section-header">
															Rating
														</span>
														<Stack direction="horizontal">
															<img
																src={Star}
																className="star"
																alt="star"
															/>
															<Stack
																direction="vertical"
																className="mx-2 "
															>
																<span className="title__rating">
																	{
																		title
																			.rating
																			.averageRating
																	}
																</span>
																<span className="title__number-of-votes">
																	{
																		title
																			.rating
																			.numberOfVotes
																	}
																</span>
															</Stack>
														</Stack>
													</Stack>
												)}
												<Stack
													direction="vertical"
													className="title__your-rating"
													onClick={rateTitle}
												>
													{loggedInUser && (
														<>
															<span className="title__section-header">
																Your rating
															</span>
															<Stack direction="horizontal">
																<i className="bi bi-star title__rate-icon">
																	{' '}
																</i>
																<span className="title__rate-text">
																	Rate the
																	title{' '}
																</span>
															</Stack>
														</>
													)}
												</Stack>
												{loggedInUser && (
													<Stack
														className="d-flex justify-content-center align-items-center"
														onClick={
															handleBookmarkClick
														}
														style={{
															cursor: 'pointer',
														}}
													>
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
												)}
											</Stack>
										</Col>
										<p className="title__plot">
											{title.plot}{' '}
										</p>
									</Col>
								</Row>
								<Row className="my-3">
									<span className="title__section-header">
										Directors
									</span>
									<div className="title__directors-and-writers mb-2">
										{title.productionPersons && (
											<ul className="list">
												{Array.isArray(
													title.productionPersons
												) &&
													title.productionPersons
														.filter(
															(
																productionPerson
															) =>
																productionPerson &&
																productionPerson.roleId ===
																	37
														)
														.slice(
															0,
															limitDirectors
																? 5
																: undefined
														)
														.map(
															(
																productionPerson
															) => (
																<li
																	onClick={() =>
																		goToPerson(
																			productionPerson.nconst
																		)
																	}
																	className="text-info list__element"
																	key={
																		productionPerson.roleId +
																		productionPerson.primaryName
																	}
																>
																	{
																		productionPerson.primaryName
																	}
																</li>
															)
														)}
												{title.productionPersons &&
													title.productionPersons.filter(
														(productionPerson) =>
															productionPerson &&
															productionPerson.roleId ===
																37
													).length > 5 && (
														<span
															className="title__limit-button text-secondary"
															onClick={
																handleDirectorsClick
															}
														>
															{limitDirectors
																? 'Show More'
																: 'Show Less'}
															...
														</span>
													)}
											</ul>
										)}
									</div>
									<span className="title__section-header">
										Writers
									</span>
									<div className="title__directors-and-writers">
										<ul className="list">
											{title.productionPersons && (
												<ul className="list">
													{Array.isArray(
														title.productionPersons
													) &&
														title.productionPersons
															.filter(
																(
																	productionPerson
																) =>
																	productionPerson &&
																	productionPerson.roleId ===
																		28
															)
															.slice(
																0,
																limitWriters
																	? 5
																	: undefined
															)
															.map(
																(
																	productionPerson
																) => (
																	<li
																		onClick={() =>
																			goToPerson(
																				productionPerson.nconst
																			)
																		}
																		className="text-info list__element"
																		key={
																			productionPerson.roleId +
																			productionPerson.primaryName
																		}
																	>
																		{
																			productionPerson.primaryName
																		}
																	</li>
																)
															)}
													{title.productionPersons &&
														title.productionPersons.filter(
															(
																productionPerson
															) =>
																productionPerson &&
																productionPerson.roleId ===
																	28
														).length > 5 && (
															<span
																className="title__limit-button text-secondary"
																onClick={
																	handleWritersClick
																}
															>
																{limitWriters
																	? 'Show More'
																	: 'Show Less'}
																...
															</span>
														)}
												</ul>
											)}
										</ul>
									</div>
								</Row>
								<Row>
									<Col
										s={12}
										md={6}
										className="title__section-cast"
									>
										<span className="title__section-header--large">
											Top Cast
										</span>

										<div className="title__top-cast">
											{title.principals &&
												(() => {
													const castWithCharacters =
														title.principals.filter(
															(principal) =>
																principal &&
																principal.characters
														);

													const displayedCast =
														limitCast
															? castWithCharacters.slice(
																	0,
																	4
															  )
															: castWithCharacters;

													return displayedCast.map(
														(principal) => (
															<PersonPreview
																onClick={() =>
																	goToPerson(
																		principal
																			.person
																			.nconst
																	)
																}
																key={
																	principal.url
																}
																name={
																	principal
																		.person
																		?.primaryName ||
																	'Unknown'
																}
																character={
																	principal.characters
																}
																img={
																	principal.photoUrl
																}
															/>
														)
													);
												})()}
										</div>

										{title.principals?.filter(
											(principal) =>
												principal &&
												principal.characters
										).length > 4 && (
											<div
												className="title__cast-button title__button-expand"
												onClick={handleTopCastClick}
											>
												{limitCast ? (
													<i className="bi bi-chevron-down title__cast-button-icon">
														{' '}
														Show more{' '}
													</i>
												) : (
													<i className="bi bi-chevron-up title__cast-button-icon">
														{' '}
														Show less{' '}
													</i>
												)}
											</div>
										)}

										<span className="title__section-header--large">
											Production
										</span>

										<div className="title__top-cast">
											{title.principals &&
												(() => {
													const castWithJobs =
														title.principals.filter(
															(principal) =>
																principal &&
																principal.job
														);

													const displayedCast =
														limitProduction
															? castWithJobs.slice(
																	0,
																	4
															  )
															: castWithJobs;

													return displayedCast.map(
														(principal) => (
															<PersonPreview
																onClick={() =>
																	goToPerson(
																		principal
																			.person
																			.nconst
																	)
																}
																key={
																	principal.url
																}
																name={
																	principal
																		.person
																		?.primaryName ||
																	'Unknown'
																}
																job={
																	principal.job
																}
																img={
																	principal.photoUrl
																}
															/>
														)
													);
												})()}
										</div>

										{title.principals?.filter(
											(principal) =>
												principal && principal.job
										).length > 4 && (
											<div
												className="title__cast-button title__button-expand"
												onClick={handleProductionClick}
											>
												{limitProduction ? (
													<i className="bi bi-chevron-down title__cast-button-icon">
														{' '}
														Show more{' '}
													</i>
												) : (
													<i className="bi bi-chevron-up title__cast-button-icon">
														{' '}
														Show less{' '}
													</i>
												)}
											</div>
										)}
									</Col>
									<Col s={12} md={6}>
										<span className="title__section-header--large title__known-for">
											People Known For This Title
										</span>
										{title.knownFors && (
											<div className="title__known-for">
												{limitKnownFor
													? title.knownFors
															.slice(0, 4)
															.map((person) => (
																<PersonPreview
																	onClick={() =>
																		goToPerson(
																			person.nconst
																		)
																	}
																	key={
																		person.url
																	}
																	name={
																		person.primaryName
																	}
																	img={
																		person.photoUrl
																	}
																	isSmall={
																		true
																	}
																/>
															))
													: title.knownFors.map(
															(person) => (
																<PersonPreview
																	onClick={() =>
																		goToPerson(
																			person.nconst
																		)
																	}
																	key={
																		person.url
																	}
																	name={
																		person.primaryName
																	}
																	img={
																		person.photoUrl
																	}
																	isSmall={
																		true
																	}
																/>
															)
													  )}
												{title.knownFors.length > 4 && (
													<div
														className="title__button-expand"
														onClick={
															handleKnownForClick
														}
													>
														{limitKnownFor ? (
															<i className="bi bi-chevron-down title__cast-button-icon">
																{' '}
																Show more{' '}
															</i>
														) : (
															<i className="bi bi-chevron-up title__cast-button-icon">
																{' '}
																Show less{' '}
															</i>
														)}
													</div>
												)}
											</div>
										)}
									</Col>
								</Row>

								{title.episodes.length > 0 && (
									<Row>
										<div>
											<span className="title__section-header--large">
												Episodes
											</span>
											<span className="title__episodes-number mx-2">
												{title.episodes.length}
											</span>
										</div>
										<Stack direction="horizontal">
											<Button
												variant="outline-light"
												onClick={handlePreviousEpisode}
											>
												<i className="bi bi-caret-left-fill"></i>
											</Button>
											<div className="title__episodes">
												{title.episodes
													.slice(
														episodeFirstIndex,
														episodeFirstIndex + 3
													)
													.map((episode) => (
														<div
															className="title__episode"
															key={episode.tconst}
															onClick={() =>
																goToTitlePage(
																	episode.tconst
																)
															}
														>
															<Episode
																season={
																	episode.seasonNumber
																}
																episodeNumber={
																	episode.episodeNumber
																}
															></Episode>
														</div>
													))}
											</div>

											<Button
												variant="outline-light"
												onClick={handleNextEpisode}
											>
												<i className="bi bi-caret-right-fill"></i>
											</Button>
										</Stack>
									</Row>
								)}
								{loggedInUser && 
								<RateTitleModal
								show={showModal}
								handleClose={handleClose}
								userId={loggedInUser.userId}
								tconst={title.url.split('/').pop()}
								token={loggedInUser.token}>
								</RateTitleModal>
								}
								
								</Container>
								): (
						<div>No title found</div>
						)}
							
							
					</div>
					
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Title;
