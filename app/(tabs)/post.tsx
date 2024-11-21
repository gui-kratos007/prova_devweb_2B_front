import { useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import '../App.css';
import { AuthContext } from '../authcontext';

export default function NewPost() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
          authorId: user?.id,
        }),
      });
      if (!response.ok) throw new Error('Erro ao criar postagem.');
      console.log('Postagem criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  return (
    <div className="nova-postagem-container">
      <div className="user-info">
        <div className="username">@{user?.email.split('@')[0]}</div>
      </div>

      <form className="post-form-container" onSubmit={handlePostSubmit}>
        <div className="form-title">Nova Postagem</div>
        <div className="post-input-container">
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Título"
            className="post-title-input"
          />
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Conteúdo"
            className="post-input"
          />
        </div>
        <button className="publish-button">Publicar</button>
      </form>
    </div>
  );
}
