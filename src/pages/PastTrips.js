import TripCard from '../components/TripCard.js';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ToggleBar from '../components/ToggleBar.js';
import AddIcon from '../img/Add_Icon.svg';

export default function PastTrips({ destinations }) {
  const pastDestinations = destinations.filter(destination => {
    return destination.isTripFuture === false;
  });
  return (
    <>
      <header>
        <Header>Your Trips</Header>
      </header>
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
        <Link to="/newtrip">
          <AddButton
            src={AddIcon}
            alt="Create new Trip"
            to="/newtrip"
            width={48}
            height={48}
          />
        </Link>
      </DestinationWrapper>
    </>
  );
}

const Header = styled.h1`
  text-align: center;
`;

const DestinationWrapper = styled.main`
  display: grid;
  gap: 10px;
`;

const linkStyle = {
  textDecoration: 'none',
  color: '#F3F4F6',
};

const AddButton = styled.img`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 2;
`;
