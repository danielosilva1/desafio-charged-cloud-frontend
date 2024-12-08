import { useEffect, useState } from 'react';
import './get-companies.css';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { CompanyAddressData, CustomError, GetCompaniesParams } from '../../../utils/interfaces';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Swal from 'sweetalert2';

function GetCompanies() {
    const [params, setParams] = useState<GetCompaniesParams>({
        cnpj: '',
        name: ''
    });
    const [filteredCompanies, setFilteredCompanies] = useState<CompanyAddressData[]>([
        {
            id: 0,
            cnpj: '',
            name: '',
            phoneNumber: '',
            address: {
                id: 0,
                cep: '',
                street: '',
                neighborhood: '',
                number: 0,
                additionalInfo: '',
                city: '',
                state: ''
            }
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
        axios.get('/company/get', { params })
        .then((response) => {
            if (response.status == 200) {
                setFilteredCompanies(response.data);
                console.log(filteredCompanies)
            }
        }).catch((error) => {
            const err = error.response.data as CustomError;

            Swal.fire({
                icon: 'error',
                text: err.msg ? err.msg : 'Token de autenticação inválido. Faça login novamente'
            });
        });
    }

    useEffect(() => {
        useEffect(() => {
            axios.get('/status')
            .then((response) => {
                if (response.status == 200) {
                    // Usuário autenticado: carrega todos as empresas
                    handleGetCompanies();
                }
            }).catch((error) => {
                // Se um erro for retornado significa que usuário não está autenticado, redireciona para página inicial
                window.location.href = 'http://localhost:8000';
                console.error(error.message);
            });
        }, []);
    }, []);

    return (
        <>
            <div className='row justify-content-center align-items-center'>
                <div className='mt-3 mt-md-5 mt-lg-7'>
                    <h3 className='pageTitle'>Buscar empresas</h3>
                </div>
                <div className='col-md-8 mt-3 mt-md-5 mt-lg-7 getForm'>
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
                                    as={InputMask}
                                    mask=''
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
                <div className='col-md-11'>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>CNPJ</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                                {/* <th>CEP</th>
                                <th>Rua</th>
                                <th>Número</th>
                                <th>Bairro</th>
                                <th>Complemento</th>
                                <th>Cidade</th>
                                <th>Estado</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.map((item) => (
                                ( item.cnpj != '' && 
                                <tr key={item.cnpj}>
                                    <td>{item.cnpj}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{`${item.address.street}, ${item.address.number}, ${item.address.additionalInfo ? `${item.address.additionalInfo}, ` : '' } ${item.address.neighborhood}, ${item.address.city}, ${item.address.state}`}</td>
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