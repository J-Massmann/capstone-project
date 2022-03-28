import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import goback from '../img/go-back.svg';
import home from '../img/Home_Icon.svg';
import getDisplayDate from '../components/hooks/getDisplayDate.js';

export default function DetailDay({ onGetCurrentDestination }) {
  const { daydate } = useParams();
  const { id } = useParams();
  const { date } = useParams();
  const navigate = useNavigate();
  const detailDestination = onGetCurrentDestination(id);
  const route = detailDestination[0].routes.find(route => {
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
      <Wrapper>
        <Subheader>{date}</Subheader>
        <Subheader2>Locations:</Subheader2>
        {route?.locations.length > 0 ? (
          route.locations.map(location => (
            <Location key={location}>{location}</Location>
          ))
        ) : (
          <p>You haven't added any locations to your Route</p>
        )}
      </Wrapper>
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

const Wrapper = styled.main`
  display: block;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 550px) {
    width: 535px;
  }
`;

const Subheader = styled.h2`
  width: 100%;
  margin-bottom: 0;
  font-size: 1.5em;
  text-decoration: underline;
  font-weight: bold;
`;

const Subheader2 = styled.h3`
  width: 100%;
  margin-bottom: 0;
  font-size: 1.5em;
  text-decoration: underline;
  font-weight: bold;
`;

const Location = styled.p`
  padding: 6px 12px;
  margin-top: 10px;
  border-radius: 14px;
  background-color: var(--bg-color-content);
  color: var(--bg-color-main);
  width: 100%;
  height: 2.5em;
  max-width: 400px;
  text-align: center;
`;
