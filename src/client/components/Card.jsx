import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  background: #fff;
  border: 1px solid transparent;
  border-radius: 15px;
  padding: 24px;
  
  p {
    max-height: 205px;
    overflow: auto;
    text-align: justify;
    @media (max-width: 768px) {
      max-height: unset;
    }
  }
`;

const Card = ({ name, description }) => (
  <Wrapper>
    <h4>{name}</h4>
    <p>{description}</p>
  </Wrapper>
);

export default Card;
