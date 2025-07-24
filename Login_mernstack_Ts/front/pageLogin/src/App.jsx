import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Verifica se há token no localStorage ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Aqui você poderia buscar os dados do usuário se necessário
    }
  }, []);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações básicas
    if (!isLogin && !formData.username.trim()) {
      setError('Nome de usuário é obrigatório');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Email inválido');
      return;
    }

    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const endpoint = isLogin
        ? 'http://localhost:3333/api/login'
        : 'http://localhost:3333/api/register';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Algo deu errado');
      }

      // Tratamento para sucesso
      if (!isLogin) {
        setSuccessMessage('Usuário criado com sucesso!');
        setFormData({
          email: '',
          password: '',
          username: ''
        });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        // Login bem-sucedido
        console.log('Dados recebidos no login:', data); // Para debug

        // Armazena o token (se estiver usando)
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // Armazena os dados do usuário no estado
        setUserData({
          username: data.user.username, // Ajuste conforme a estrutura do seu user
          email: data.user.email,
          // Adicione outros campos conforme necessário
        });

        setIsAuthenticated(true);
      }

    } catch (err) {
      console.error('Erro:', err);
      setError(err.message || 'Erro ao processar sua requisição');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserData(null);
  };

  // Se estiver autenticado, mostra a página inicial
  if (isAuthenticated) {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Bem-vindo, {userData.username || 'Usuário'}!</h1>
          <button onClick={handleLogout} className="logout-button">Sair</button>
        </header>
        <main className="dashboard-content">
          <div className="welcome-message">
            <h2>Hello World!</h2>
            {/* <p>Você está logado com o email: {userData?.email}</p> */}
          </div>
        </main>
      </div>
    );
  }

  // Se não estiver autenticado, mostra o formulário de login/registro
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>{isLogin ? 'Login' : 'Registrar'}</h1>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Username*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
              />
            </div>
          )}

          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </form>

        <p className="toggle-auth" onClick={toggleAuthMode}>
          {isLogin
            ? 'Não tem uma conta? Registre-se aqui.'
            : 'Já tem uma conta? Faça login aqui.'}
        </p>
      </div>
    </div>
  );
}

export default App;