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

export function GoBackIconForm({ iconGoBack }) {
  const navigate = useNavigate();
  return (
    <IconButtonForm onClick={() => navigate(-1)}>
      <img src={iconGoBack} alt="go back in to DetailPage" />
    </IconButtonForm>
  );
}

const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;

const IconButtonForm = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
  position: absolute;
  left: 0;
`;
