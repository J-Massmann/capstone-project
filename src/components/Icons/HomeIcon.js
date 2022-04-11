import styled from 'styled-components';
import { Link } from 'react-router-dom';
import home from '../../img/Home_Icon.svg';

export default function HomeIcon() {
  return (
    <IconButton>
      <Link to={`/futuretrips`}>
        <img src={home} alt="home" />
      </Link>
    </IconButton>
  );
}

const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;
