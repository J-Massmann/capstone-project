import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function GoBackIcon({ iconGoBack }) {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)}>
      <img src={iconGoBack} alt="go back in to DetailPage" />
    </IconButton>
  );
}

const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;
