import styled from 'styled-components';
import deleteIcon from '../img/Delete_Icon.svg';

export default function DeleteIcon({ handleOpen }) {
  return (
    <IconButton onClick={() => handleOpen()}>
      <img src={deleteIcon} alt="delete_route" />
    </IconButton>
  );
}

const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;
