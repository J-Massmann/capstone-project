import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../img/Delete_Icon.svg';

export default function Header({ children, iconGoBack }) {
  const navigate = useNavigate();
  return (
    <Heading>
      <IconButton goback onClick={() => navigate(-1)}>
        <img src={iconGoBack} alt="go back in to DetailPage" />
      </IconButton>
      <Headline>{children}</Headline>
      <IconButton onClick={() => setIsOpen(true)}>
        <img src={deleteIcon} alt="delete_route" />
      </IconButton>
    </Heading>
  );
}

const Heading = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Headline = styled.h1`
  background: linear-gradient(
        -225deg,
        transparent 8px,
        var(--bg-color-action) 0
      )
      bottom left,
    linear-gradient(-45deg, transparent 8px, var(--bg-color-action) 0) bottom
      right;
  box-shadow: 0px 25px 10px -15px rgba(0, 0, 0, 0.25);
  background-size: 51% 20px;
  background-repeat: no-repeat;
  width: 50%;
  text-align: center;
`;

const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;
