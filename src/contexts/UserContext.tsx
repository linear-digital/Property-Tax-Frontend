import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/user';
import { checkToken } from '../util/axios.instance';
import { Spin } from 'antd';

interface UserContextType {
  user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (
      async () => {
        setLoading(true);
        const user = await checkToken();
        if (!user) {
          window.location.pathname = "/login"
        }
        setLoading(false);

        setUser(user);
      }
    )()
  }, [])
  return (
    <UserContext.Provider value={{ user }}>
      {
        loading ? <Spin spinning fullscreen size='large' /> :
          children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a ThemeProvider');
  }
  return context;
};