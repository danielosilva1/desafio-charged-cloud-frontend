import './home.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { axios } from '../../../config/axios';

function Home() {
    const handleLogin = () => {
        // TODO
        console.log(`Enviar requisição para ${axios.defaults.baseURL}/auth/google/login`,
        );
    }
    return (
        <Container fluid='true' className='vh-100 d-flex flex-column'>
            {/* Linha do Header */}
            <Row className='w-100 text-center m-0'>
                <Col sm>
                    <Navbar className='bg-body-tertiary'>
                        <Container>
                            <Navbar.Brand href='/'>Desafio Charged</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className='justify-content-end'>
                                <Navbar.Text>
                                    <p className='fs-5'>Entre com <Button variant='outline-primary'><FontAwesomeIcon icon={faGoogle} onClick={handleLogin}/>
                                        </Button>
                                    </p>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
            <Row className='flex-grow-1 d-flex justify-content-center text-center align-items-center'>
                {/* Linhas para os cards */}
                <Col sm={3} className='d-flex justify-content-center'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant='top' src='../../../public/create.jpg' />
                        <Card.Body>
                            <Card.Title>Cadastre uma empresa</Card.Title>
                            <Card.Text>
                                Cadastre novas empresas e registre informações como CNPJ, nome, telefone e endereço.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3} className='d-flex justify-content-center'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant='top' src='../../../public/read.jpg' />
                        <Card.Body>
                            <Card.Title>Consulte empresas</Card.Title>
                            <Card.Text>
                                Veja os dados de todas as empresas ou filtre por correspondência parcial pelo CNPJ ou nome.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3} className='d-flex justify-content-center'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant='top' src='../../../public/update.jpg' />
                        <Card.Body>
                            <Card.Title>Atualize uma empresa</Card.Title>
                            <Card.Text>
                                Atualize os dados de uma empresa e mantenha o cadastro sempre atualizado.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={3} className='d-flex justify-content-center'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant='top' src='../../../public/delete.jpg' />
                        <Card.Body>
                            <Card.Title>Exclua uma empresa</Card.Title>
                            <Card.Text>
                                Exclua os dados de uma empresa e mantenha a organização e integridade do banco de dados.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <p>Imagens obtidas no Freepik</p>
        </Container>
    );
}
export default Home;