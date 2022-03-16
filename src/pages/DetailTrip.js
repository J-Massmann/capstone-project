import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import goback from '../img/akar-icons_arrow-back.svg';
import edit from '../img/Edit_Icon.svg';
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
          <SubHeaderWrapper>
            <h1>{trip.place}</h1>
            <Link to={`/edit/${trip.place}`}>
              <img src={edit} alt="edit_icon" />
            </Link>
          </SubHeaderWrapper>
          <Subheader2>Locations:</Subheader2>
          <ul>
            {trip.locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
          <Subheader2>Status of your trip</Subheader2>
          <Subheader3>Switch the status:</Subheader3>
          <ToggleButton
            isTripFuture={trip.isTripFuture}
            onHandleTripStatus={() => handleTripStatus(trip.id)}
          />
        </section>
      ))}
    </>
  );
}

const SubHeaderWrapper = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  & h1 {
    width: 100%;
    margin-bottom: 0;
    font-size: 2em;
    font-weight: bold;
    @media (max-width: 230px) {
      text-align: end;
    }
  }
  img {
    @media (min-width: 200px) {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    cursor: pointer;
  }
`;

const Subheader2 = styled.h2`
  margin-bottom: 10px;
  margin-top: 10px;
  text-decoration: underline;
`;

const Subheader3 = styled.p`
  margin: 0;
`;

const GoBack = styled.img`
  cursor: pointer;
`;
