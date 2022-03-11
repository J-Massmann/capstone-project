import TripCard from '../components/TripCard.js';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ToggleBar from '../components/ToggleBar.js';

export default function PastTrips({ destinations }) {
  const pastDestinations = destinations.filter(destination => {
    return destination.isTripFuture === false;
  });
  return (
    <>
      <ToggleBar />
      <DestinationWrapper>
        {pastDestinations.length > 0 ? (
          pastDestinations.map(destination => (
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
          <p>
            You haven't selected any destinations where you have been.
            <br />
            Go check the current trips to get some inspiration for you next
            trip!
          </p>
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
