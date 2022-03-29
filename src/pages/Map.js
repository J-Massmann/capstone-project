import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import goback from '../img/go-back.svg';
import home from '../img/Home_Icon.svg';
import getDisplayDate from '../components/hooks/getDisplayDate.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({ onGetCurrentDestination }) {
  const navigate = useNavigate();
  const { daydate } = useParams();
  const { id } = useParams();
  const { date } = useParams();
  const currentDestination = onGetCurrentDestination(id);
  const route = currentDestination[0].routes.find(route => {
    return getDisplayDate(route.date) === date;
  });
  console.log(route);

  return (
    <>
      <Heading>
        <Button goback onClick={() => navigate(-1)}>
          <img src={goback} alt="go back in to DetailPage" />
        </Button>
        <h1>Route {daydate}</h1>
        <Button>
          <Link to={`/futuretrips`}>
            <img src={home} alt="home" />
          </Link>
        </Button>
      </Heading>
      <MapContainer center={[13.38333, 52.51667]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[13.38333, 52.51667]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
const Heading = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
  @media (min-width: 266px) {
    position: absolute;
    right: ${props => (props.goback ? '' : '0')};
    left: ${props => (props.goback ? '0' : '')};
  }
`;
