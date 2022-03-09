import TripCard from '../components/TripCard.js';
import styled from 'styled-components';

export default function PastTrips({ destinations, handleTripStatus }) {
  const pastDestinations = destinations.filter(destination => {
    return destination.isTripFuture === false;
  });
  return (
    <DestinationWrapper>
      {pastDestinations.map(destination => (
        <TripCard
          key={destination.id}
          id={destination.id}
          place={destination.place}
          locations={destination.locations}
          isTripFuture={destination.isTripFuture}
          handleTripStatus={() => handleTripStatus(destination.id)}
        />
      ))}
    </DestinationWrapper>
  );
}

const DestinationWrapper = styled.main`
  display: grid;
  gap: 10px;
`;
