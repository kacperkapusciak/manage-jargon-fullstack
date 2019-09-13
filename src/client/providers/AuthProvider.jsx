import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>
  );
};

const withAuth = Component => (props) => {
  const value = useContext(AuthContext);
  return <Component auth={value} {...props} />;
};

export { AuthProvider, withAuth };
