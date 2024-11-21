import { useRouter } from 'expo-router';
import './App.css'; // Importando os estilos globais

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="container">
      <header className="header">
        <h1>Bem-vindo ao Nosso App!</h1>
        <p className="welcome">Entre na sua conta para acessar todos os recursos.</p>
      </header>

      <div className="actions">
        <button 
          className="action-button" 
          onClick={() => router.push('/login')}
        >
          Fazer Login
        </button>
        <button 
          className="action-button" 
          onClick={() => router.push('/cadastro')}
        >
          Criar Conta
        </button>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Nosso App. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
