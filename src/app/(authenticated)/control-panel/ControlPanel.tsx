import './control-panel.css';
import { Card, Col, Container, Row } from 'react-bootstrap';

function ControlPanel() {
    return (
        <>
            <Container fluid='true' className='vh-100 d-flex flex-column'>
                <Row className='flex-grow-1 d-flex justify-content-center text-center align-items-center'>
                    {/* Linhas para os cards */}
                    <Col sm={3} className='d-flex justify-content-center'>
                        <a href='/register-company' className='panelCard'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant='top' src='../../../public/create.jpg' />
                                <Card.Body>
                                    <Card.Title>Cadastrar uma empresa</Card.Title>
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-center'>
                        <a href='/get-companies' className='panelCard'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant='top' src='../../../public/read.jpg' />
                                <Card.Body>
                                    <Card.Title>Consultar empresas</Card.Title>
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-center'>
                        <a href='/update-company' className='panelCard'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant='top' src='../../../public/update.jpg' />
                                <Card.Body>
                                    <Card.Title>Atualizar uma empresa</Card.Title>
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                    <Col sm={3} className='d-flex justify-content-center'>
                        <a href='/delete-company' className='panelCard'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant='top' src='../../../public/delete.jpg' />
                                <Card.Body>
                                    <Card.Title>Excluir uma empresa</Card.Title>
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                </Row>
                <p>Imagens obtidas no Freepik</p>
            </Container>
        </>
    );
}

export default ControlPanel;