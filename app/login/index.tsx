import React, { useState } from 'react';
import './App.css';
import { useRouter } from 'expo-router';

// Tipo para os dados do formulário
interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        // Supondo que o token é salvo no localStorage ou algo similar
        localStorage.setItem('authToken', data.token);
        router.push('/home');
      } else {
        console.error('Erro ao fazer login');
      }
    } catch (err) {
      console.error('Erro ao enviar os dados: ', err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Entrar</h1>
        <p>Acesse sua conta</p>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          Entrar
        </button>
      </form>
      <footer>
        <p>Não tem conta? <a href="/cadastro">Cadastre-se</a></p>
      </footer>
    </div>
  );
}
