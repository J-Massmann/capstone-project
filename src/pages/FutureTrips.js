import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TripCard from '../components/TripCard.js';

export default function FutureTrips({ destinations, handleTripStatus }) {
  const futureDestinations = destinations.filter(destination => {
    return destination.isTripFuture;
  });

  return (
    <DestinationWrapper>
      {futureDestinations.length > 0 ? (
        futureDestinations.map(destination => (
          <Link to={`/${destination.place}`}>
            <TripCard
              key={destination.id}
              id={destination.id}
              place={destination.place}
              locations={destination.locations}
              isTripFuture={destination.isTripFuture}
              handleTripStatus={() => handleTripStatus(destination.id)}
            />
          </Link>
        ))
      ) : (
        <p>No future trips planned!</p>
      )}
    </DestinationWrapper>
  );
}

const DestinationWrapper = styled.main`
  display: grid;
  gap: 10px;
`;
