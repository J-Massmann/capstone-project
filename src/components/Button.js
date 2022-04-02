import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Button({ link, children }) {
  return (
    <ButtonWrapper>
      <LinkDayPlaner to={link}>{children}</LinkDayPlaner>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  width: 50%;
  max-width: 250px;
  height: 2.5rem;
  justify-self: center;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
  position: fixed;
  bottom: 15px;
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
  &:active {
    transform: scale(0.9);
    filter: brightness(90%);
  }
`;

const LinkDayPlaner = styled(Link)`
  width: 100%;
  display: block;
  text-decoration: none;
  color: var(--bg-color-main);
`;
