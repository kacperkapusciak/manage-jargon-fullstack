import styled from 'styled-components';

const Button = styled.button`
    padding: 10px 35px;
    margin: 1rem 0;
    background: ${({ outline }) => (outline ? 'none' : 'rgb(52, 95, 144)')};
    color: ${({ outline }) => (outline ? 'rgb(52, 95, 144)' : '#f5f5f5')};
    font-weight: bold;
    border-radius: 2px;
    border: ${({ outline }) => (outline ? '1.5px solid rgb(52, 95, 144)' : 'none')};
    font-size: 15px;
    transition: all .2s ease;
    width: ${({ unsized }) => (unsized ? '100%' : 'unset')};
    
    @media (max-width: 768px) {
      height: 48px;
    }
`;

export default Button;
