import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const endpoint = action === "Login" 
                ? 'http://localhost:3333/api/login' 
                : 'http://localhost:3333/api/register';
            
            // Prepara os dados para envio
            const payload = action === "Login"
                ? { email: formData.email, password: formData.password }
                : formData;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Algo deu errado');
            }

            // Tratamento para sucesso
            if (action === "Sign Up") {
                setSuccessMessage('Conta criada com sucesso!');
                // Limpa o formulário após cadastro bem-sucedido
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });
                // Muda para a tela de login após 3 segundos
                setTimeout(() => {
                    setAction("Login");
                    setSuccessMessage('');
                }, 3000);
            } else {
                // Login bem-sucedido
                console.log('Login success:', data);
                // Armazena o token se existir
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                // Redireciona para a página principal ou dashboard
                window.location.href = '/'; // Ou use react-router
            }

        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Erro ao processar sua requisição');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            
            {/* Mensagens de feedback */}
            {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>{successMessage}</div>}
            
            <div className="inputs">
                {action === "Sign Up" && <div className="input">
                    <input 
                        type="text" 
                        name="name"
                        placeholder='Name' 
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>}
               
                <div className="input">
                    <input 
                        type="email" 
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Password' 
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>
            
            {action === "Sign Up" ? <div></div> : 
                <div className="forgot-password">Lost Password <span>Click Here!</span></div>}
 
            <div className="submit-container">
                <div 
                    className={action === "Login" ? "submit gray" : "submit"} 
                    onClick={() => {
                        setAction("Sign Up");
                        setError('');
                        setSuccessMessage('');
                    }}
                > 
                    Sign Up
                </div>
                <div 
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => {
                        setAction("Login");
                        setError('');
                        setSuccessMessage('');
                    }}
                >
                    Login
                </div>
            </div>
            
            {/* Botão de ação principal */}
            <div 
                className="submit" 
                style={{ margin: '20px auto' }}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Processing...' : action}
            </div>
        </div>
    );
};

export default LoginSignup;