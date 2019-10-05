import React from 'react';
import styled from 'styled-components';

import { withAuth } from '../providers/AuthProvider';

import Logo from './Logo';
import Button from './Button';

const Nav = styled.nav`
  background: #fff;
  width: 100vw;
  border-bottom: 1px solid #ddd;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 960px;
  height: 60px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Navbar = ({ auth }) => (
  <Nav>
    <Wrapper>
      <Logo />
      {auth.token && <Button onClick={auth.logout}>Sign out</Button>}
    </Wrapper>
  </Nav>
);

export default withAuth(Navbar);
