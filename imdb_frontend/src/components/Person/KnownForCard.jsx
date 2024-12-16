import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const KnownForCard = (knownForItem) => {
	const navigate = useNavigate();
	const { title, url } = knownForItem.knownForItem || {};
	const titleId = url.match(/\/([^/]+)$/)?.[1];
	const { titleName, poster } = title || {};

	return (
		<Card
			onClick={() => navigate(`/title/${titleId}`)}
			variant="flush"
			className="bg-dark text-light"
			style={{
				width: '18rem',
				height: '18rem',
				cursor: 'pointer',
			}}
		>
			{poster && poster !== 'N/A' ? (
				<Card.Img
					style={{
						width: '100%',
						height: '10rem',
						objectFit: 'cover',
					}}
					variant="top"
					src={poster || 'https://via.placeholder.com/150'}
					alt={titleName || 'No Title'}
				/>
			) : (
				<Card.Img
					style={{
						width: '100%',
						height: '10rem',
						objectFit: 'cover',
					}}
					variant="top"
					src={`https://picsum.photos/200/300?random=${titleId}`}
				/>
			)}

			<Card.Body style={{ height: '5rem' }}>
				{titleName || 'Unknown Title'}
			</Card.Body>
		</Card>
	);
};

export default KnownForCard;
