import { createContext, useState } from 'react';

export const AuthContext = createContext([null, () => null]);
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
  
    return (
      <AuthContext.Provider value={[token, setToken]}>
        {children}
      </AuthContext.Provider>
    );
};

