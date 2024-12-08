import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

const Header : React.FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    const handleLogout = () => {
        // Remove token dos cookies
        removeCookie('access_token');

        // Redireciona para página inicial
        window.location.href = 'http://localhost:8000';
    }
    return (
        <Navbar className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href='/control-panel'>Desafio Charged</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>
                    <Button variant='outline-dark' onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /></Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;