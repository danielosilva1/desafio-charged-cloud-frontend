import { useState } from 'react';
import './get-companies.css';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { CompanyAddressData, GetCompaniesParams } from '../../../utils/interfaces';

function GetCompanies() {
    const [params, setParams] = useState<GetCompaniesParams>({
        cnpj: '',
        name: ''
    });
    const [filteredCompanies, setFilteredCompanies] = useState<CompanyAddressData[]>([
        {
            cnpj: '',
            name: '',
            phoneNumber: '',
            cep: '',
            street: '',
            neighborhood: '',
            number: 0,
            additionalInfo: '',
            city: '',
            state: ''
        }
    ]);

    // Trata mudanças nas caixas de input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Lógica para lidar com a mudança nos campos de entrada
        const { name, value } = event.target;
        setParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGetCompanies = () => {
        console.log('Buscar empresas pelos parâmetros:');
        console.log('CNPJ: ' + params.cnpj);
        console.log('Nome: ' + params.name);
    }

    return (
        <>
            <div className='row justify-content-center align-items-center'>
                <div className='mt-3 mt-md-5 mt-lg-7'>
                    <h3 className='pageTitle'>Buscar empresas</h3>
                </div>
                <div className='col-md-6 mt-3 mt-md-5 mt-lg-7 getForm'>
                    <Form className='form' noValidate>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md='4'>
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='CNPJ'
                                    name='cnpj'
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md='6'>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Nome'
                                    name='name'
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md='2' className='d-flex align-items-end'>
                                <Button variant='outline-primary' className='mb-1 ms-2' onClick={handleGetCompanies}>Buscar</Button>
                            </Form.Group>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className='row justify-content-center align-items-center'>
                <div className='col-md-12'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>CNPJ</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>CEP</th>
                                <th>Rua</th>
                                <th>Número</th>
                                <th>Bairro</th>
                                <th>Complemento</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.map((item) => (
                                ( item.cnpj != '' && 
                                <tr key={item.cnpj}>
                                    <td>{item.cnpj}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.cep}</td>
                                    <td>{item.street}</td>
                                    <td>{item.number}</td>
                                    <td>{item.neighborhood}</td>
                                    <td>{item.additionalInfo}</td>
                                    <td>{item.city}</td>
                                    <td>{item.state}</td>
                                </tr>
                                )
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default GetCompanies;