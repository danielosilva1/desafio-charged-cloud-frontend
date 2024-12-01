import './update-company.css';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { CompanyData } from '../../../utils/interfaces';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPlus } from '@fortawesome/free-solid-svg-icons';

function UpdateCompany() {
    const [validated, setValidated] = useState(false);
    const [cnpjParam, setCnpjParam] = useState('');
    const [showUpdateArea, setShowUpdateArea] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyData>({
        id: 0,
        cnpj: '',
        name: '',
        phoneNumber: '',
        addressId: 0
    });

    const handleSelectCnpjChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setCnpjParam(value);

        // Oculta área de atualização, caso cnpj seja vazio
        if (value == '') {
            setShowUpdateArea(false);
        }
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
            [name]: value,
        }));
    };

    const handleGetCompany = () => {
        console.log(`Buscar empresa com CNPJ: ${cnpjParam}`);
        setShowUpdateArea(true);
    }

    const handleGoToAddAddress = () => {
        // Abre tela de cadastro de endereço em outra aba
        const url = '/register-address';
        window.open(url, '_blank');
    }

    const handleGetAllAddresses = () => {
        console.log('Buscar todos os endereços')
    }

    const handleCancel = () => {
        setShowUpdateArea(false);
    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // TODO
            event.preventDefault();
            event.stopPropagation();
            handleUpdateCompany();
        }
        setValidated(true);
    };

    const handleUpdateCompany = () => {
        console.log(`Atualizar os dados da empresa com id: ${companyData.id}`);
        console.log(`Novos dados:
            Nome: ${companyData.name}
            CNPJ: ${companyData.cnpj}
            Telefone: ${companyData.phoneNumber}
            Endereço: ${companyData.addressId}
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
                                    <option value='1'>CNPJ 1</option>
                                    <option value='2'>CNPJ 2</option>
                                    <option value='3'>CNPJ 3</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md='2' className='d-flex align-items-end'>
                                <Button variant='outline-primary' className='mb-1 ms-2' onClick={handleGetCompany}>Buscar</Button>
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
                                    />
                                    <Form.Control.Feedback type='invalid'>Informe o telefone</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md='10' controlId='validationCustom04'>
                                    <Form.Label>Endereço*</Form.Label>
                                    <Form.Select aria-label='Default select example' required name='address' onChange={handleSelectChange}>
                                        <option></option>
                                        <option value='1'>One</option>
                                        <option value='2'>Two</option>
                                        <option value='3'>Three</option>
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