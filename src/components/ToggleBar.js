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

export function ToggleButton({ isTripFuture, onHandleTripStatus }) {
  return (
    <div>
      <ToggleStatusButton
        status="future"
        className={isTripFuture === true ? 'active' : ''}
        aria-label="toggleTripStatus"
        onClick={onHandleTripStatus}
      >
        future
      </ToggleStatusButton>
      <ToggleStatusButton
        className={isTripFuture === true ? '' : 'active'}
        aria-label="toggleTripStatus"
        onClick={onHandleTripStatus}
      >
        past
      </ToggleStatusButton>
    </div>
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
    props.status === 'future' ? `10px 0 0 10px` : `0 10px 10px 0`};
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

const ToggleStatusButton = styled.button`
  max-width: 100px;
  width: 30%;
  min-width: 45px;
  padding: 5px;
  border-radius: ${props =>
    props.status === 'future' ? `10px 0 0 10px` : `0 10px 10px 0`};
  border: 1px solid var(--bg-color-main);
  &.active {
    background-color: var(--bg-color-action);
  }
`;
