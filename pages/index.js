/*********************************************************************************
* BTI425 – Assignment 5
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* 
Name: Sidhant Sharma
Student ID: 123151219
Date: 19 March 2022
*
*
********************************************************************************/ 
import { Row, Col, Image } from 'react-bootstrap';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  )
}

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <>
      {isLoading ? <CircularIndeterminate /> : (
        <>
          <Row>
            <Col>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <p>The Metropolitan Museum of Art of New York, colloquially "the Met," is the largest art museum in the United States. With 7.06 million visitors in 2016, it was the third most visited art museum in the world, and the fifth most visited museum of any kind. Its permanent collection contains over 2 million works, divided among 17 curatorial departments. The main building, on the eastern edge of Central Park along Museum Mile in Manhattan's Upper East Side is by area one of the world's largest art galleries. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.</p>
              <p>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.</p>
            </Col>
            <Col md={6}>
              <p>The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.</p>
              <p><a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art</a>.</p>
            </Col>
          </Row>

          <footer style={{ width: '100%', backgroundColor: 'grey', color: 'white', textAlign: 'center' }}>
            <p>SIDHANT SHARMA    -    BTI 425 Assignment 5</p>
          </footer>
        </>
      )}
    </>
  );
};

export default Home;
