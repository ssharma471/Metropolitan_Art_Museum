import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { searchHistoryAtom } from "@/store";
import { useAtom } from 'jotai';
function NavScrollExample() {
    const router = useRouter();
    const [serach, setSearch] = useState('');
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);


    const handleSearch = (event) => {
        event.preventDefault();
        router.push(`/artwork?title=true&q=${serach}`);
        setSearch("");
        setSearchHistory(current => [...current,`title=true&q=${serach}` ]);
    };
    return (
        <>
            <Navbar navbar="dark" bg="primary" expand="lg" className='fixed-top' fixed="top">
                <Container fluid>
                    <Nav.Link href="https://ardentcoders.blogspot.com/" passHref legacyBehavior target={'_blank'}>
                        <Navbar.Brand>Sidhant Sharma</Navbar.Brand>
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                Home
                                </Nav.Link>
                            </Link>
                            {/* <Nav.Link href="/" passHref legacyBehavior>Home</Nav.Link> */}
                            <Link href="/search" passHref legacyBehavior>
                            <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>                            
                            </Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior>
                            <NavDropdown.Item active={router.pathname === "/favourites"}>Favourite                   
                                </NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/history"}>Search History                    
                                </NavDropdown.Item>
                                </Link>

                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                value={serach}
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(event) => setSearch(event.target.value)}

                            />
                            <Button variant="success" type='submit'>Search</Button>
                        </Form>
                        
                    </Navbar.Collapse>
                </Container>
                <br />
                <br />
            </Navbar>
            <br />
            <br />

            <br />

        </>
    );
}

export default NavScrollExample;