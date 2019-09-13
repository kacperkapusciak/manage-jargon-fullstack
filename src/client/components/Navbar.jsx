import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';

const Nav = styled.nav`
  background: #fff;
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #ddd;
`;

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Navbar = () => (
  <Nav>
    <Wrapper>
      <Logo />
    </Wrapper>
  </Nav>
);

export default Navbar;
