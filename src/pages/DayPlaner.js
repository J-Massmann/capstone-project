import styled from 'styled-components';
import goback from '../img/go-back.svg';
import home from '../img/Home_Icon.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DayCard from '../components/DayCard.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';

export default function Dayplaner({ onGetCurrentDestination }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const detailDestination = onGetCurrentDestination(id);

  const displayStartDate = getDisplayDate(detailDestination[0]?.startDate);
  const displayEndDate = getDisplayDate(detailDestination[0]?.endDate);
  const sortedRoutes = detailDestination[0]?.routes
    .slice()
    .sort((dateA, dateB) => new Date(dateA.date) - new Date(dateB.date));
  return (
    <>
      <Heading>
        <Button goback onClick={() => navigate(-1)}>
          <img src={goback} alt="go back in to DetailPage" />
        </Button>
        <h1>Day Planer</h1>
        <Button>
          <Link to={`/futuretrips`}>
            <img src={home} alt="home" />
          </Link>
        </Button>
      </Heading>
      <Wrapper>
        <Subheader>{id}</Subheader>
        <p>
          {displayStartDate} - {displayEndDate}
        </p>
      </Wrapper>
      <CardWrapper>
        {sortedRoutes?.length > 0 ? (
          sortedRoutes?.map((data, index) => (
            <Link
              key={data.date}
              to={`/details/${id}/daplaner/day ${index + 1}`}
              style={linkStyle}
            >
              <DayCard key={index} routeNumber={index + 1} data={data} />
            </Link>
          ))
        ) : (
          <p>You haven't planned any of your days in {id}</p>
        )}
      </CardWrapper>
      <CreateButton>
        <LinkForm to={`/details/${id}/dayplaner/plannewday`}>
          Plan another day
        </LinkForm>
      </CreateButton>
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
  font-size: 2em;
  font-weight: bold;
`;

const CardWrapper = styled.section`
  display: grid;
  gap: 10px;
`;

const linkStyle = {
  textDecoration: 'none',
  color: '#F3F4F6',
};

const CreateButton = styled.button`
  width: 50%;
  max-width: 250px;
  height: 2.5rem;
  justify-self: center;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
  position: fixed;
  bottom: 15px;
`;

const LinkForm = styled(Link)`
  width: 100%;
  display: block;
  text-decoration: none;
  color: var(--bg-color-main);
`;
