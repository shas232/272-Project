import { useState, useEffect } from 'react';

interface User {
  username: string;
  role: 'EMPLOYEE' | 'HR';
}

const USERS = {
  emp1: { username: 'emp1', password: '12345', role: 'EMPLOYEE' as const },
  admin: { username: 'admin', password: '12345', role: 'HR' as const }
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', user.username);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('username');
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    const userRecord = USERS[username as keyof typeof USERS];
    
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid credentials');
    }

    const userData = {
      username: userRecord.username,
      role: userRecord.role
    };

    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
}