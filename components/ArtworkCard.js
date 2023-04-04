import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {  title, objectDate, classification, medium, primaryImageSmall } = data;
  const imageSrc = primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

  return (

<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <div>Date: {objectDate || 'N/A'}</div>
          <div>Classification: {classification || 'N/A'}</div>
          <div>Medium: {medium || 'N/A'}</div>
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
        <Button variant="primary">ID: {objectID}
        </Button>
        </Link>
      </Card.Body>
    </Card>
);


  //   <Card>
  //     <Card.Img variant="top" src={imageSrc} />
  //     <Card.Body>
  //       <Card.Title>{title || 'N/A'}</Card.Title>
  //       <Card.Text>
  //         <div>Object Date: {objectDate || 'N/A'}</div>
  //         <div>Classification: {classification || 'N/A'}</div>
  //         <div>Medium: {medium || 'N/A'}</div>
  //       </Card.Text>
  //       <Link href={`/artwork/${objectID}`} passHref>
  //         <Button variant="primary">
  //           View Artwork ({objectID})
  //         </Button>
  //       </Link>
  //     </Card.Body>
  //   </Card>
  // );
}
