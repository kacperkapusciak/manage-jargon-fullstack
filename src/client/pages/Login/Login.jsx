import React from 'react';
import styled from 'styled-components';

import LoginForm from './LoginForm';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
`;

const Login = () => (
  <Wrapper>
    <LoginForm />
  </Wrapper>
);

export default Login;
