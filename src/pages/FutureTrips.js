import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TripCard from '../components/TripCard.js';
import ToggleBar from '../components/ToggleBar.js';
import AddIcon from '../img/Add_Icon.svg';

export default function FutureTrips({ destinations }) {
  let today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  today = dd + '/' + mm + '/' + '/' + yyyy;
  console.log(today >= '20/03/2022');
  const futureDestinations = destinations.filter(destination => {
    return destination.isTripFuture;
  });

  return (
    <>
      <header>
        <Header>Your Trips</Header>
      </header>
      <ToggleBar />
      <DestinationWrapper>
        {futureDestinations.length > 0 ? (
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
