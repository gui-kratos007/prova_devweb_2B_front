import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../authcontext';
import '../App.css';

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) throw new Error('Falha ao carregar posts.');
        const posts: Post[] = await response.json();
        setData(posts);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      router.replace('/login');
    } else {
      fetchPosts();
    }
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <div className="container">
      <header>
        <div className="user-info">
          <div className="username">@{user?.email.split('@')[0]}</div>
        </div>
      </header>
      <div className="posts-list">
        {data.map((post) => (
          <div key={post.id} className="post-container">
            <div className="post-header">
              <p className="user-name">@{post.author.email.split('@')[0]}</p>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
