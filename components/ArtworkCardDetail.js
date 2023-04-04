import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useEffect, useState } from 'react';

function ArtworkCardDetail({ objectID }) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setshowAdded] = useState(true)

    const { data, error } = useSWR(
        objectID?`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`:null)
    ;
    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
        return null;
    }
    
    const { primaryImage, title, objectDate, classification, medium, artistDisplayName, artistWikidata_URL, creditLine, dimensions } = data;
    
    useEffect(()  => {
        if (favouritesList.includes(objectID)) {
            setshowAdded(true);
        }
        else{
            setshowAdded(false);
        }
      }, [favouritesList, objectID]);
    
    const favouritesClicked = () => {
        if(showAdded){
        setFavouritesList(current => current.filter(fav => fav != objectID));
        }
        else{
            setFavouritesList(current => [...current, objectID]);      
            setshowAdded(false);
        }
    }
        return (
        <Card>
            {primaryImage && (
                <Card.Img
                    variant="top" src={primaryImage}  
                   // onError={(err) => {
                    //     // err.target.onerror = null;
                    //     err.target.src = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
                    // }}
                />
            )}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    Date: {objectDate || 'N/A'}<br />
                    Classification: {classification || 'N/A'}<br />
                    Medium: {medium || 'N/A'}<br /><br />
                    Artist: {artistDisplayName || 'N/A'}
                    {artistWikidata_URL && (
                        <>
                            {/* <br /> */}
                            <a href={artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>                                wiki
                        </>
                    )}
                    <br />
                    Credit Line: {creditLine || 'N/A'}
                    <br />
                    Dimensions: {dimensions || 'N/A'}
                </Card.Text>
                <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
            </Card.Body>
            
        </Card>
    );
}

export default ArtworkCardDetail;
