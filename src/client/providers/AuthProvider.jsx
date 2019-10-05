import React, { useState, useEffect, useContext, createContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const history = useHistory();

  // try auto sign up
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) setToken(tokenFromLocalStorage);
  }, []);

  const login = authToken => {
    localStorage.setItem('token', authToken);
    setToken(authToken);
    return <Redirect to="/dashboard" />;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    history.push('/');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const withAuth = Component => props => {
  const value = useContext(AuthContext);
  return <Component auth={value} {...props} />;
};

export { AuthProvider, withAuth };
