import { Button, Col, Form, Row } from 'react-bootstrap';
import './register-address.css';
import React, { useState } from 'react';
import { AddressData } from '../../../utils/interfaces';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function RegisterAddress() {
    const [validated, setValidated] = useState(false);
    const [cepParam, setCepParam] = useState('');
    const [showAddressArea, setShowAddressArea] = useState(false);
    const navigate = useNavigate();
    const [address, setAddres] = useState<AddressData>({
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
        setAddres((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleGetAddres() {
        console.log(`Buscar endereço com o CEP: ${cepParam}`);
        setShowAddressArea(true);
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
            handleRegisterAddress();
        }
        setValidated(true);
    };

    const handleRegisterAddress = () => {
        console.log('Criar endereço com os seguintes dados:');
        console.log(`
            CEP: ${address.cep}
            Rua: ${address.street}
            Nº: ${address.number}
            Bairro: ${address.neighborhood}
            Complemento: ${address.additionalInfo}
            Cidade: ${address.city}
            Estado: ${address.state}
            `);
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
    return (
        <>
            <div className='row justify-content-center align-items-center'>
                <div className='mt-3 mt-md-5 mt-lg-7'>
                    <h3 className='pageTitle'>Adicionar endereço</h3>
                </div>
                <div className='col-md-6 mt-3 mt-md-5 mt-lg-7 registerAddressForm'>
                    <Form className='form'>
                        {/* Áre a de busca de endereço pelo CEP */}
                        <Row className='mb-3'>
                            <Form.Group as={Col} md='8'>
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='CEP'
                                    name='cep'
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md='2' className='d-flex align-items-end'>
                                <Button variant='outline-primary' className='mb-1 ms-2' onClick={handleGetAddres}>Buscar</Button>
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
                                        />
                                        <Form.Control.Feedback type='invalid'>Informe o número</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md='4' controlId='validationCustom03'>
                                        <Form.Label>Bairro*</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Bairro'
                                            name='neighborhood'
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>Informe o bairro</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md='4'>
                                        <Form.Label>Complemento</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Complemento'
                                            name='additionalInfo'
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md='4' controlId='validationCustom04'>
                                        <Form.Label>Cidade*</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder='Cidade'
                                            name='city'
                                            onChange={handleInputChange}
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