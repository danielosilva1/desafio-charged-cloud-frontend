import './update-company.css';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { AddressData, CompanyAddressData, CompanyData, CustomError } from '../../../utils/interfaces';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function UpdateCompany() {
    const [cookies] = useCookies(['access_token']);
    const navigate = useNavigate();
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
            [name]: { id: value },
        }));
    };

    const handleGetCompanyByCnpj = () => {
        axios.get('/company/get', {
            params: {
                cnpj: cnpjParam,
                headers: {
                    'Authorization': `Bearer ${cookies['access_token']}`
                }
            }
        }).then((response) => {
            if (response.status == 200) {
                if (response.data.length > 0) {
                    setCompanyData(response.data[0]);
                    setShowUpdateArea(true);
                }
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
        Swal.fire({
            icon: 'question',
            text: 'Você será redirecionado para o painel de controle. Está certo disso?',
            showCancelButton: true,
            confirmButtonText: 'Sim, estou!',
            cancelButtonText: 'Cancelar'
        }).then(({ value }) => {
            if (value == true) {
                navigate('/control-panel')
            }
        });
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

    const handleClear = () => {
        setValidated(false);

        setCompanyData({
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
        setCnpjParam('');
        setShowUpdateArea(false);
    }

    const handleUpdateCompany = () => {
        axios.patch(`/company/update/${companyData.id}`, {
            cnpj: companyData.cnpj,
            name: companyData.name,
            phoneNumber: companyData.phoneNumber,
            addressId: companyData.address.id
        }, {
            headers: {
                'Authorization': `Bearer ${cookies['access_token']}`
            }
        }).then((response) => {
            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    text: 'Empresa atualizada com sucesso'
                });
                // Atualiza a lista de empresas para atualizar os CNPJ (pode ser que esse dado tenha sido atualizado)
                handleGetAllCompanies();
                handleClear();
            }
        }).catch((error) => {
            const err = error.response.data as CustomError;

            Swal.fire({
                icon: 'error',
                text: err.msg ? err.msg : 'Token de autenticação inválido. Faça login novamente'
            });
            console.log(error);
        });
    }

    const handleDelete = () => {
        Swal.fire({
            icon: 'warning',
            text: 'Essa ação é irreversível. Está certo disso?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, estou!'
        }).then(({ value }) => {
            if (value === true) {
                axios.delete(`/company/delete/${companyData.id}`, {
                    headers: {
                        'Authorization': `Bearer ${cookies['access_token']}`
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        Swal.fire({
                            icon: 'success',
                            text: 'Empresa excluída com sucesso'
                        });
                        setShowUpdateArea(false);
                        setCnpjParam('');

                        // Atualiza a lista de empresas para obter os CNPJ apenas das empresas que continuam no banco
                        handleGetAllCompanies();
                    }
                }).catch((error) => {
                    const err = error.response.data as CustomError;

                    Swal.fire({
                        icon: 'error',
                        text: err.msg ? err.msg : 'Token de autenticação inválido. Faça login novamente'
                    })
                });
            }
        });
    }

    const handleGetAllCompanies = () => {
        axios.get('/company/get', {
            headers: {
                'Authorization': `Bearer ${cookies['access_token']}`
            }
        }).then((response) => {
            if (response.status == 200) {
                setAllCompanies(response.data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleGetAllAddresses = () => {
        axios.get('/address/get-all', {
            headers: {
                'Authorization': `Bearer ${cookies['access_token']}`
            }
        }).then((response) => {
            if (response.status == 200) {
                setAddresses(response.data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        axios.get('/auth/status', {
            headers: {
                'Authorization': `Bearer ${cookies['access_token']}`
            }
        }).then((response) => {
            if (response.status == 200) {
                // Usuário logado: carrega CNPJ das empresas cadastradas e todos os endereços
                handleGetAllCompanies();
                handleGetAllAddresses();
            }
        }).catch((error) => {
            // Se um erro for retornado significa que usuário não está autenticado, redireciona para página inicial
            window.location.href = 'http://localhost:8000';
            console.error(error.message);
        });
    }, []);

    return (
        <>
            <div className='row justify-content-center align-items-center'>
                <div className='mt-3 mt-md-5 mt-lg-7'>
                    <h3 className='pageTitle'>Atualizar/excluir empresa</h3>
                </div>
                <div className='col-md-8 mt-3 mt-md-5 mt-lg-7 getForm'>
                    <Form className='form' noValidate>
                        <Row className='mb-3'>
                            <Form.Group as={Col} md='7'>
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Select aria-label='Default select example' name='cnpj' onChange={handleSelectCnpjChange} value={cnpjParam}>
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
                                <Button variant='outline-success' type='submit' className='button'>Salvar</Button>
                            </div>
                        </Form>
                    </div>
                </div>

            }
        </>
    );
}

export default UpdateCompany;