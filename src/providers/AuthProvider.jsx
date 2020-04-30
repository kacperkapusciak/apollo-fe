import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  function authenticate() {
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, isCreator, setIsCreator }}>
      {children}
    </AuthContext.Provider>
  );
};

const withAuth = Component => props => {
  const value = useContext(AuthContext);
  return <Component auth={value} {...props} />;
};

export { AuthProvider, withAuth };
