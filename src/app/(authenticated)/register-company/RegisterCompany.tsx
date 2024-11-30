import './register-company.css';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CompanyAddressData, CompanyData, CustomError } from '../../../utils/interfaces';
import { axios } from '../../../config/axios';
import { AxiosError } from 'axios';

function RegisterCompany() {
    const navigate = useNavigate(); // Navegação entre telas
    const [validated, setValidated] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyData>({
        id: 0,
        cnpj: '',
        name: '',
        phoneNumber: '',
        address: ''
    });
    const [addresses, setAddresses] = useState<CompanyAddressData[]>([]);

    // Trata mudanças nas caixas de input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Lógica para lidar com a mudança nos campos de entrada
        const { name, value } = event.target;
        setCompanyData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Trata mudanças na caixa de seleção
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Lógica para lidar com a mudança nos campos de entrada
        const { name, value } = event.target;
        setCompanyData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            handleRegisterCompany();
        }
        setValidated(true);
    };

    const handleRegisterCompany = () => {
        Swal.fire({
            icon: 'info',
            text: `Cadastrar empresa com os seguintes dados:
            CNPJ: ${companyData.cnpj}
            NOME: ${companyData.name}
            TELEFONE: ${companyData.phoneNumber}
            ENDEREÇO: ${companyData.address}
            `
        });
    }

    const handleCancel = () => {
        Swal.fire({
            icon: 'question',
            text: 'Você será redirecionado para o painel de controle. Você está certo disso?',
            showCancelButton: true,
            confirmButtonText: 'Sim, estou!',
            cancelButtonText: 'Cancelar'
        }).then(({ value }) => {
            if (value == true) {
                navigate('/control-panel')
            }
        });
    }

    useEffect(() => {
        // Carrega todos os endereços cadastrados
        axios.get('/address/get-all')
        .then((response) => {
            if (response.status == 200) {
                setAddresses(response.data);
            }
        }).catch((error: AxiosError) => {
            const err = error.response?.data as CustomError;
            console.error(err.msg);
        });
    }, []);
    return (
        <div className='row justify-content-center align-items-center'>
            <div className='mt-3 mt-md-5 mt-lg-7'>
                <h3 className='pageTitle'>Cadastrar empresa</h3>
            </div>
            <div className='col-md-6 mt-3 mt-md-5 mt-lg-7 createForm'>
                <Form className='form' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md='3' controlId='validationCustom01'>
                            <Form.Label>CNPJ*</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                placeholder='CNPJ'
                                name='cnpj'
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type='invalid'>Informe o CNPJ</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='6' controlId='validationCustom02'>
                            <Form.Label>Nome*</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Nome'
                                name='name'
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type='invalid'>Informe o nome</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='3' controlId='validationCustom03'>
                            <Form.Label>Telefone*</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Telefone'
                                name='phoneNumber'
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type='invalid'>Informe o telefone</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='11' controlId='validationCustom04'>
                                <Form.Label>Endereço*</Form.Label>
                                <Form.Select aria-label='Default select example' required name='address' onChange={handleSelectChange}>
                                    <option selected></option>
                                    {
                                        addresses.map((item: CompanyAddressData) => (
                                            <option key={item.id} value={item.id}>{`${item.street}, ${item.number}, ${item.additionalInfo}, ${item.neighborhood}, ${item.city}, ${item.state}`}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>Informe o endereço</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='1' className='d-flex align-items-end'>
                            <Button variant='primary' className='mb-1 ms-2'>+</Button>
                        </Form.Group>
                    </Row>
                    <div className='buttonsArea'>
                        <Button variant='outline-warning' onClick={handleCancel} className='button'>Cancelar</Button>

                        <Button variant='outline-success' type='submit' className='button'>Cadastrar</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default RegisterCompany;