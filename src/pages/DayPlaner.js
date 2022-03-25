import styled from 'styled-components';
import goback from '../img/go-back.svg';
import home from '../img/Home_Icon.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DayCard from '../components/DayCard.js';

export default function Dayplaner({ destinations }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const detailDestination = destinations?.filter(destination => {
    return destination.place === id;
  });

  const startDate = new Date(detailDestination[0]?.startDate);
  const startYYYY = startDate.getFullYear();
  let startMM = startDate.getMonth() + 1;
  let startDD = startDate.getDate();
  if (startDD < 10) startDD = '0' + startDD;
  if (startMM < 10) startMM = '0' + startMM;
  const displayStartDate = startDD + '.' + startMM + '.' + startYYYY;

  const endDate = new Date(detailDestination[0]?.endDate);
  const endYYYY = endDate.getFullYear();
  let endMM = endDate.getMonth() + 1;
  let endDD = endDate.getDate();
  if (endDD < 10) endDD = '0' + endDD;
  if (endMM < 10) endMM = '0' + endMM;
  const displayEndDate = endDD + '.' + endMM + '.' + endYYYY;

  const testData = [
    {
      id: 1,
      route: 1,
      date: `${startDD}.${startMM}.`,
    },
    {
      id: 2,
      route: 2,
      date: `${endDD}.${endMM}.`,
    },
  ];
  return (
    <>
      <Heading>
        <Button goback onClick={() => navigate(-1)}>
          <img src={goback} alt="go back in to DetailPage" />
        </Button>
        <h1>Day-Planer</h1>
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
        {testData.map(data => (
          <DayCard
            key={data.id}
            dayNumber={data.id}
            routeNumber={data.route}
            date={data.date}
          />
        ))}
      </CardWrapper>
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
  @media (max-width: 230px) {
    text-align: end;
  }
`;

const CardWrapper = styled.section`
  display: grid;
  gap: 10px;
`;
