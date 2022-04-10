import styled from 'styled-components';
import DeleteIcon from './Icons/DeleteIcon';
import GoBackIcon, { GoBackIconForm } from './Icons/GoBackIcon';
import HomeIcon from './Icons/HomeIcon';

export default function Header({ children, handleClick, iconGoBack }) {
  return (
    <Heading>
      <GoBackIcon iconGoBack={iconGoBack} />
      <Headline>{children}</Headline>
      <DeleteIcon handleOpen={handleClick} />
    </Heading>
  );
}

export function FormHeader({ iconGoBack, children }) {
  return (
    <Heading FormHeader>
      <GoBackIconForm iconGoBack={iconGoBack} />
      <Headline>{children}</Headline>
    </Heading>
  );
}

export function DayHeader({ children, iconGoBack }) {
  return (
    <Heading>
      <GoBackIcon iconGoBack={iconGoBack} />
      <Headline>{children}</Headline>
      <HomeIcon />
    </Heading>
  );
}

const Heading = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.FormHeader ? 'center' : 'space-between')};
  position: ${props => (props.FormHeader ? 'relative' : '')};
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
