import styled from 'styled-components';
import edit from '../../img/Edit_Icon.svg';
import { Link } from 'react-router-dom';

export default function EditIcon({link}) {
    return(
        <IconButton>
              <Link to={link}>
                <img src={edit} alt="edit_icon" />
              </Link>
            </IconButton>
    )
}

const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
  height: fit-content;
  @media (min-width: 266px) {
    position: absolute;
    right: ${props => (props.delete ? '' : '0')};
  }
`;