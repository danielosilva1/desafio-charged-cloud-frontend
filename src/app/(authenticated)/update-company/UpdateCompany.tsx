import './update-company.css';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { AddressData, CompanyAddressData, CompanyData } from '../../../utils/interfaces';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function UpdateCompany() {
    const [validated, setValidated] = useState(false);
    const [cnpjParam, setCnpjParam] = useState('');
    const [showUpdateArea, setShowUpdateArea] = useState(false);
    const [addresses, setAddresses] = useState<AddressData[]>([]);
    const [allCompanies, setAllCompanies] = useState<CompanyData[]>([]);
    const [companyData, setCompanyData] = useState<CompanyAddressData>({
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
    });

    const handleSelectCnpjChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCnpjParam(value);

        setShowUpdateArea(false);
    }

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
            [name]: {id: value},
        }));
    };

    const handleGetCompanyByCnpj = () => {
        axios.get('/company/get', { params: { cnpj: cnpjParam } })
        .then((response) => {
            if (response.status == 200) {
                setCompanyData(response.data[0]);
                setShowUpdateArea(true);
            }
        }).catch((error) => {
            setShowUpdateArea(false);
            console.error(error);
        });
    }

    const handleGoToAddAddress = () => {
        // Abre tela de cadastro de endereço em outra aba
        const url = '/register-address';
        window.open(url, '_blank');
    }

    const handleCancel = () => {
        setShowUpdateArea(false);
    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() !== false) {
            handleUpdateCompany();
        }

        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    };

    const handleUpdateCompany = () => {
        console.log(`Atualizar os dados da empresa com id: ${companyData.id}`);
        console.log(`Novos dados:
            Nome: ${companyData.name}
            CNPJ: ${companyData.cnpj}
            Telefone: ${companyData.phoneNumber}
            Endereço: ${companyData.address.id}
        `
        );
    }

    const handleDelete = () => {
        Swal.fire({
            icon: 'warning',
            text: 'Essa ação é irreversível. Você está certo disso?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, estou!'
        }).then(({ value }) => {
            if (value == true) {
                console.log(`Deletar a empresa com id ${companyData.id}`);
            }
        });
    }

    const handleGetAllCompanies = () => {
        axios.get('/company/get')
        .then((response) => {
            if (response.status == 200) {
                setAllCompanies(response.data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleGetAllAddresses = () => {
        axios.get('/address/get-all')
            .then((response) => {
                if (response.status == 200) {
                    setAddresses(response.data);
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        // Carrega CNPJ das empresas cadastradas
        handleGetAllCompanies();
        handleGetAllAddresses();
    }, []);

    return (
        <>
            <div className='row justify-content-center align-items-center'>
                <div className='mt-3 mt-md-5 mt-lg-7'>
                    <h3 className='pageTitle'>Atualizar empresa</h3>
                </div>
                <div className='col-md-8 mt-3 mt-md-5 mt-lg-7 getForm'>
                    <Form className='form' noValidate>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md='7'>
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Select aria-label='Default select example' name='cnpj' onChange={handleSelectCnpjChange}>
                                    <option></option>
                                    {
                                        allCompanies.map((item) => (
                                            <option key={item.id} value={item.cnpj}>{item.cnpj}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md='2' className='d-flex align-items-end'>
                                <Button variant='outline-primary' className='mb-1 ms-2' onClick={handleGetCompanyByCnpj}>Buscar</Button>
                            </Form.Group>
                        </Row>
                    </Form>
                </div>
            </div>
            {showUpdateArea &&
                <div className='row justify-content-center align-items-center'>
                    <div className='col-md-8 mt-3 mt-md-5 mt-lg-7 updateForm'>
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
                                        as={InputMask}
                                        mask='99.999.999/0009-99'
                                        value={companyData.cnpj}
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
                                        value={companyData.name}
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
                                        as={InputMask}
                                        mask='(99) 99999-9999'
                                        value={companyData.phoneNumber}
                                    />
                                    <Form.Control.Feedback type='invalid'>Informe o telefone</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md='10' controlId='validationCustom04'>
                                    <Form.Label>Endereço*</Form.Label>
                                    <Form.Select aria-label='Default select example' required name='address' onChange={handleSelectChange} value={companyData.address.id}>
                                        <option></option>
                                        {
                                            addresses.map((item) => (
                                                <option key={item.id} value={item.id}>{`${item.street}, ${item.number}, ${item.additionalInfo ? `${item.additionalInfo}, ` : ''} ${item.neighborhood}, ${item.city}, ${item.state}`}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type='invalid'>Informe o endereço</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md='1' className='d-flex align-items-end'>
                                    <Button variant='outline-primary' className='mb-1 ms-2' onClick={handleGoToAddAddress}><FontAwesomeIcon icon={faPlus} /></Button>
                                </Form.Group>
                                <Form.Group as={Col} md='1' className='d-flex align-items-end'>
                                    <Button variant='outline-info' className='mb-1 ms-2' onClick={handleGetAllAddresses}><FontAwesomeIcon icon={faArrowsRotate} /></Button>
                                </Form.Group>
                            </Row>
                            <div className='buttonsArea'>
                                <Button variant='outline-danger' className='button' onClick={handleDelete}>Excluir</Button>
                                <Button variant='outline-warning' onClick={handleCancel} className='button'>Cancelar</Button>
                                <Button variant='outline-success' type='submit' className='button'>Cadastrar</Button>
                            </div>
                        </Form>
                    </div>
                </div>

            }
        </>
    );
}

export default UpdateCompany;