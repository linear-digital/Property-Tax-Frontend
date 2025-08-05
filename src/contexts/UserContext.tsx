import React, { createContext, useContext, useState, useEffect} from 'react';
import type { User } from '../types/user';
import { checkToken } from '../util/axios.instance';
import { Spin } from 'antd';
import type { Role } from '../types/role';

interface UserContextType {
  user: User | null;
  permissions: string[]
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
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
  useEffect(() => {
    if (user) {
      setUserPermissions([
        ...userPermissions,
        ...user.roles.flatMap((role: Role) => role.permissions)
      ]);
    }
  }, [user])
  if (user?.disabled) {
    return <h1>Your account are disabled</h1>
  }
  return (
    <UserContext.Provider value={{ user, permissions: userPermissions }}>
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