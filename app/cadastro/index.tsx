import React, { useState } from 'react';
import './App.css';
import { useRouter } from 'expo-router';

// Definição para um formulário básico de cadastro
interface UserData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [userData, setUserData] = useState<UserData>({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Erro no cadastro');
      }
    } catch (err) {
      console.error('Erro ao enviar os dados: ', err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Cadastre-se</h1>
        <p>Crie sua conta agora</p>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          Cadastrar
        </button>
      </form>
      <footer>
        <p>Já tem conta? <a href="/login">Faça login</a></p>
      </footer>
    </div>
  );
}

