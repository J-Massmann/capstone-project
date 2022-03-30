import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function ToggleBar() {
  return (
    <ToggleBarWrapper>
      <LinkButton
        status="future"
        aria-label="Link to future trips"
        to="/futuretrips"
      >
        future
      </LinkButton>
      <LinkButton aria-label="Link to past trips" to="/pasttrips">
        past
      </LinkButton>
    </ToggleBarWrapper>
  );
}

const ToggleBarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const LinkButton = styled(NavLink)`
  display: flex;
  color: var(--font-color);
  background-color: var(--bg-color-content);
  border-radius: ${props =>
    props.status === 'future' ? `14px 0 0 14px` : `0 14px 14px 0`};
  border: 1px solid var(--bg-color-main);
  width: 45%;
  height: 2.2rem;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(191, 194, 200, 0.4);
  &.active {
    background-color: var(--bg-color-action);
    box-shadow: 0 6px 12px rgba(255, 90, 114, 0.6);
    font-weight: bold;
    font-size: 1rem;
  }
`;
