import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TripCard from '../components/TripCard.js';
import ToggleBar from '../components/ToggleBar.js';

export default function FutureTrips({ destinations, handleTripStatus }) {
  const futureDestinations = destinations.filter(destination => {
    return destination.isTripFuture;
  });

  return (
    <>
      <ToggleBar />
      <DestinationWrapper>
        {futureDestinations.length > 0 ? (
          futureDestinations.map(destination => (
            <Link
              key={destination.id}
              to={`/futuretrips/${destination.place}`}
              style={linkStyle}
            >
              <TripCard
                key={destination.id}
                id={destination.id}
                place={destination.place}
              />
            </Link>
          ))
        ) : (
          <p>No future trips planned!</p>
        )}
      </DestinationWrapper>
    </>
  );
}

const DestinationWrapper = styled.main`
  display: grid;
  gap: 10px;
`;
const linkStyle = {
  textDecoration: 'none',
  color: '#F3F4F6',
};
