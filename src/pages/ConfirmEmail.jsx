import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConfirmEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/v1/login/confirm-email/${token}`
                );
                if (response.status === 200) {
                    setMessage('Email confirmado com sucesso!');
                    setTimeout(() => {
                        navigate("/login")
                    }, 3000)
                } else {
                    setMessage('Erro ao confirmar email.');
                }
            } catch (error) {
                console.error('Erro ao confirmar email:', error);
                setMessage('Erro ao confirmar email.');
            }
        };

        confirmEmail();
    }, [token, navigate]);

    return (
        <div>
            <h1>Confirmação de Email</h1>
            <p>{message}</p>
        </div>
    );
}

export default ConfirmEmail;