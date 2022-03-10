import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function ToggleBar() {
  return (
    <ToggleBarWrapper>
      <LinkButtonFuture aria-label="Link to future trips" to="/futuretrips">
        future
      </LinkButtonFuture>
      <LinkButtonPast aria-label="Link to past trips" to="/pasttrips">
        past
      </LinkButtonPast>
    </ToggleBarWrapper>
  );
}

const ToggleBarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const LinkButtonFuture = styled(NavLink)`
  display: flex;
  color: var(--font-color);
  background-color: var(--bg-color-content);
  border-radius: 15px 0 0 15px;
  border: 1px solid var(--bg-color-main);
  width: 40%;
  height: 2.2rem;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  &.active {
    background-color: var(--bg-color-action);
  }
`;

const LinkButtonPast = styled(NavLink)`
  display: flex;
  background-color: var(--bg-color-content);
  color: var(--font-color);
  border-radius: 0 15px 15px 0;
  border: 1px solid var(--bg-color-main);
  width: 40%;
  height: 2.2rem;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  &.active {
    background-color: var(--bg-color-action);
  }
`;
