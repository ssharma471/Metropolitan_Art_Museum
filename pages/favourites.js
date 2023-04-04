import React from 'react';
import { useAtom } from 'jotai';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard'; 
import Artwork from './artwork';
import { favouritesAtom } from '@/store';
const favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);
  
  return (
    <Row className="gy-4">
      {favouritesList.length > 0 ? (
        favouritesList.map((currentObjectID) => (
          <Col lg={3} key={currentObjectID}>
            <ArtworkCard objectID={currentObjectID} />
          </Col>
        ))
      ) : (
        <Col>
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              Try adding some new artwork to the list.
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default favourites;
