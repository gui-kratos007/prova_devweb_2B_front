"use client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, FormEvent, ReactNode, useEffect, useState } from 'react';
import { getData } from './storage';

type AuthContextProps = {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (data: SignInData, event: FormEvent) => Promise<void>;
  signUp: (data: RegisterData, event: FormEvent) => Promise<void>;
};

type SignInData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type UserData = {
  id: number;
  name: string;
  email: string;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const isAuthenticated = Boolean(user);

  const login = async ({ email, password }: SignInData, event?: FormEvent) => {
    event?.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Erro ao autenticar.");

      const { token, usuario } = await response.json();
      await AsyncStorage.setItem('myToken', token);
      setUser(usuario);
      router.replace("/home");
    } catch (error) {
      alert("Erro ao fazer login");
      console.error(error);
    }
  };

  const signUp = async ({ name, email, password }: RegisterData, event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) throw new Error("Erro ao registrar.");

      await login({ email, password });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getData();
        if (token) {
          const response = await fetch("http://localhost:3000/me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) throw new Error("Erro ao buscar informações do usuário.");

          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
