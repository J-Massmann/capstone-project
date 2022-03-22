import TripCard from '../components/TripCard.js';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ToggleBar from '../components/ToggleBar.js';
import AddIcon from '../img/Add_Icon.svg';

export default function PastTrips({ destinations }) {
  const today = new Date();
  const pastDestinations = destinations?.filter(destination => {
    return destination.endDate < today;
  });
  return (
    <>
      <header>
        <Header>Your Trips</Header>
      </header>
      <ToggleBar />
      <DestinationWrapper>
        {pastDestinations?.length > 0 ? (
          pastDestinations.map(destination => (
            <Link
              key={destination.id}
              to={`/details/${destination.place}`}
              style={linkStyle}
            >
              <TripCard
                key={destination.id}
                id={destination.id}
                place={destination.place}
                startDate={destination.startDate}
                endDate={destination.endDate}
              />
            </Link>
          ))
        ) : (
          <p>No trips in the past!</p>
        )}
        <AddButton>
          <Link to="/newtrip">
            <img src={AddIcon} alt="Create new Trip" />
          </Link>
        </AddButton>
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

const AddButton = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 2;
  background: transparent;
  border: transparent;
  width: fit-content;
`;
