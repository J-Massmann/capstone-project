import styled from 'styled-components';
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
  const destinationCoordination = currentDestination[0].coordinates;

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
      <Container center={destinationCoordination} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {route.locations.map(route => (
          <Marker key={route.location} position={route.coordinates}>
            <Popup>{route.location}</Popup>
          </Marker>
        ))}
      </Container>
    </>
  );
}
const Heading = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;

const Container = styled(MapContainer)`
  height: 85vh;
  border-radius: 10px;
`;
