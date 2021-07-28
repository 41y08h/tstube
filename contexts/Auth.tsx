import React, { createContext, FC, useContext, useState } from "react";
import { useQuery } from "react-query";

const AuthContext = createContext<any>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FC = ({ children }) => {
  const { isLoading, data: currentUser } = useQuery("/api/auth/user");

  return (
    <AuthContext.Provider value={{ isLoading, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
