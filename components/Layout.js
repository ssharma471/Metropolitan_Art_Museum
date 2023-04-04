import React from 'react'
import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
export default function Layout(props) {
    return (
        // style={{ backgroundColor: 'grey' }} for below div container
        <div>
            
            <MainNav />
            <br />
            <Container > 
                {/* style={{ backgroundColor: 'yellow' }}       --     This is the styling if we have to apply it on the above container*/}
                {props.children}
            </Container>
            <br />
        
        </div>
    )
}