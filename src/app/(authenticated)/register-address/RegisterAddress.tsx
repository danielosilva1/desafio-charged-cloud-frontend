import { Button, Col, Form, Row } from 'react-bootstrap';
import './register-address.css';
import React, { useEffect, useState } from 'react';
import { CustomError, AddressData } from '../../../utils/interfaces';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';
import axios from 'axios';

function RegisterAddress() {
    const [validated, setValidated] = useState(false);
    const [cepParam, setCepParam] = useState('');
    const [showAddressArea, setShowAddressArea] = useState(false);
    const navigate = useNavigate();
    const [address, setAddress] = useState<AddressData>({
        id: 0,
        cep: '',
        street: '',
        neighborhood: '',
        number: 0,
        additionalInfo: '',
        city: '',
        state: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name == 'cep') {
            // Atualiza parâmetro de busca
            setCepParam(value);
            setShowAddressArea(false);
        }
        // Atualiza as informações do endereço (do formulário de cadastro)
        setAddress((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleGetAddress() {
        // Api do via cep espera apenas números: remove hífen
        const cleanedCep = cepParam.replace('-', '');

        axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`)
        .then((response) => {
            if (response.status == 200) {
                const address = response.data;
                
                if (address.erro == 'true') {
                    // CEP não encontrado (definição da api do via CEP)
                    setShowAddressArea(false);
                } else {
                    setAddress({
                        id: 0,
                        cep: address.cep,
                        street: address.logradouro,
                        neighborhood: address.bairro,
                        number: 0,
                        additionalInfo: '',
                        city: address.localidade,
                        state: address.uf
                    });
                    setShowAddressArea(true);
                }
            }
        }).catch((error) => {
            setShowAddressArea(false);
            console.error(error);
        });
    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() !== false) {
            handleRegisterAddress();
        }

        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    };

    const handleClear = () => {
        setValidated(false);

        // Limpa formulário
        setAddress({
            id: 0,
            cep: '',
            street: '',
            neighborhood: '',
            number: 0,
            additionalInfo: '',
            city: '',
            state: ''
        });

        // Limpa parâmetro de busca
        setCepParam('');
    }

    const handleRegisterAddress = () => {
        axios.post('/address/create', address)
        .then((response) => {
            if (response.status == 201) {
                Swal.fire({
                    icon: 'success',
                    text: 'Endereço cadastrado com sucesso'
                });
                handleClear();
                setShowAddressArea(false);
            }
        }).catch((error) => {
            const err = error.response.data as CustomError;

            Swal.fire({
                icon: 'error',
                text: err.msg ? err.msg : 'Token de autenticação inválido. Faça login novamente'
            });
            console.error(error.message);
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
        axios.get('/status')
        .then((response) => {
            console.log('Usuário logado');
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
                    <h3 className='pageTitle'>Adicionar endereço</h3>
                </div>
                <div className='col-md-8 mt-3 mt-md-5 mt-lg-7 registerAddressForm'>
                    <Form className='form'>
                        {/* Áre a de busca de endereço pelo CEP */}
                        <Row className='mb-3'>
                            <Form.Group as={Col} md='3'>
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='CEP'
                                    name='cep'
                                    onChange={handleInputChange}
                                    as={ReactInputMask}
                                    mask='99999-999'
                                    value={cepParam}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md='2' className='d-flex align-items-end'>
                                <Button variant='outline-primary' className='mb-1 ms-2' onClick={handleGetAddress}>Buscar</Button>
                            </Form.Group>
                        </Row>
                    </Form>
                    {/* Área de recebimento dos dados do endereço */}
                    {showAddressArea &&
                        <>
                            <Form className='form' noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className='mb-3'>
                                    <Form.Group as={Col} md='6' controlId='validationCustom01'>
                                        <Form.Label>Rua*</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Rua'
                                            name='street'
                                            onChange={handleInputChange}
                                            value={address.street}
                                        />
                                        <Form.Control.Feedback type='invalid'>Informe a rua</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md='2' controlId='validationCustom02'>
                                        <Form.Label>Número*</Form.Label>
                                        <Form.Control
                                            required
                                            type='number'
                                            placeholder='Número'
                                            name='number'
                                            onChange={handleInputChange}
                                            defaultValue={0}
                                            value={address.number}
                                        />
                                        <Form.Control.Feedback type='invalid'>Informe o número</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md='4'>
                                        <Form.Label>Complemento</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Complemento'
                                            name='additionalInfo'
                                            onChange={handleInputChange}
                                            value={address.additionalInfo}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md='4' controlId='validationCustom03'>
                                        <Form.Label>Bairro*</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Bairro'
                                            name='neighborhood'
                                            onChange={handleInputChange}
                                            value={address.neighborhood}
                                        />
                                        <Form.Control.Feedback type='invalid'>Informe o bairro</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md='4' controlId='validationCustom04'>
                                        <Form.Label>Cidade*</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Cidade'
                                            name='city'
                                            onChange={handleInputChange}
                                            value={address.city}
                                        />
                                        <Form.Control.Feedback type='invalid'>Informe a cidade</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md='4' controlId='validationCustom05'>
                                        <Form.Label>Estado*</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Estado'
                                            name='state'
                                            onChange={handleInputChange}
                                            value={address.state}
                                        />
                                        <Form.Control.Feedback type='invalid'>Informe o estado</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <div className='buttonsArea'>
                                    <Button variant='outline-warning' onClick={handleCancel} className='button'>Cancelar</Button>

                                    <Button variant='outline-success' type='submit' className='button'>Cadastrar</Button>
                                </div>
                            </Form>
                        </>}
                </div>
            </div>
        </>
    );
}

export default RegisterAddress;