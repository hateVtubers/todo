import { useAuth } from 'next-firebase-auth-cookies';
import { createContext, ReactNode, useContext } from 'react';
import { auth } from 'db/client';
import { UserClient } from 'next-firebase-auth-cookies/lib/types';

// @ts-ignore
const authContext = createContext<{
  loading: boolean;
  user: UserClient | null;
}>();

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuth({ auth });

  return (
    <authContext.Provider value={{ ...user }}>{children}</authContext.Provider>
  );
};

export const useAuthContext = () => {
  return {
    ...useContext(authContext),
  };
};
