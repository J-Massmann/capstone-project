import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function DetailTrip({ destinations, handleTripStatus }) {
  const { id } = useParams();
  const detailDestination = destinations.filter(destination => {
    return destination.place === id;
  });

  return (
    <>
      {detailDestination.map(trip => (
        <section key={trip.id}>
          <Header>{trip.place}</Header>
          <ToggleButton
            future
            className={trip.isTripFuture === true ? 'active' : 'unactive'}
            aria-label="toggleTripStatus"
            onClick={() => handleTripStatus(trip.id)}
          >
            future
          </ToggleButton>
          <ToggleButton
            className={trip.isTripFuture === true ? 'unactive' : 'active'}
            aria-label="toggleTripStatus"
            onClick={() => handleTripStatus(trip.id)}
          >
            past
          </ToggleButton>
          <Subheader>locations:</Subheader>
          <ul>
            {trip.locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

const Header = styled.h1`
  text-decoration: underline;
`;

const Subheader = styled.h2`
  text-decoration: underline;
`;

const ToggleButton = styled.button`
  max-width: 100px;
  width: 30%;
  min-width: 45px;
  border-radius: ${props => (props.future ? `10px 0 0 10px` : `0 10px 10px 0`)};
  border: 1px solid var(--bg-color-main);
  &.active {
    background-color: var(--bg-color-action);
  }
`;

{
  /* <ToggleButtonWrapper>
        <p>switch to:</p>
        <button
          aria-label="toggleTripStatus"
          onClick={handleTripStatus}
          type="button"
        >
          {isTripFuture === true ? 'past' : 'future'}
        </button>
      </ToggleButtonWrapper> */
}

// {trip.isTripFuture === true ? 'past' : 'future'}