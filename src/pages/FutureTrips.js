import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TripCard from '../components/TripCard.js';
import ToggleBar from '../components/ToggleBar.js';
import AddIcon from '../img/Add_Icon.svg';

export default function FutureTrips({ destinations }) {
  const today = new Date();
  const futureDestinations = destinations?.filter(destination => {
    return new Date(destination.endDate) >= today;
  });

  return (
    <>
      <HeaderContainer>
        <Header>Travel Planner</Header>
      </HeaderContainer>
      <ToggleBar />
      <DestinationWrapper>
        {futureDestinations?.length > 0 ? (
          futureDestinations.map(destination => (
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
          <p>No future trips planned!</p>
        )}
      </DestinationWrapper>
      <AddButton>
        <Link to="/newtrip">
          <img src={AddIcon} alt="Create new Trip" />
        </Link>
      </AddButton>
    </>
  );
}
const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  margin-bottom: 0.4rem;
`;

const Header = styled.h1`
  text-align: center;
  background: linear-gradient(
        -225deg,
        transparent 8px,
        var(--bg-color-action) 0
      )
      bottom left,
    linear-gradient(-45deg, transparent 8px, var(--bg-color-action) 0) bottom
      right;
  box-shadow: 0px 25px 10px -15px rgba(0, 0, 0, 0.25);
  background-size: 51% 20px;
  background-repeat: no-repeat;
  width: 80%;
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
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50px;
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
  &:active {
    transform: scale(0.9);
  }
`;
