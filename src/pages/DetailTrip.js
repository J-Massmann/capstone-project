import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import goback from '../img/akar-icons_arrow-back.svg';
import { ToggleButton } from '../components/ToggleBar.js';

export default function DetailTrip({ destinations, handleTripStatus }) {
  const { id } = useParams();
  const detailDestination = destinations.filter(destination => {
    return destination.place === id;
  });
  const navigate = useNavigate();

  return (
    <>
      <GoBack src={goback} alt="go back" onClick={() => navigate(-1)} />
      {detailDestination.map(trip => (
        <section key={trip.id}>
          <Header>{trip.place}</Header>
          <ToggleButton
            isTripFuture={trip.isTripFuture}
            onHandleTripStatus={() => handleTripStatus(trip.id)}
          />

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

const GoBack = styled.img`
  cursor: pointer;
`;
