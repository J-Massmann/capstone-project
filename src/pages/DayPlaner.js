import styled from 'styled-components';
import goback from '../img/go-back.svg';
import { Link, useParams } from 'react-router-dom';
import DayCard from '../components/DayCard.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';
import Button from '../components/Button.js';
import { DayHeader } from '../components/Header';

export default function Dayplaner({ onGetCurrentDestination }) {
  const { id } = useParams();
  const detailDestination = onGetCurrentDestination(id);

  const displayStartDate = getDisplayDate(detailDestination[0]?.startDate);
  const displayEndDate = getDisplayDate(detailDestination[0]?.endDate);
  const sortedRoutes = detailDestination[0]?.routes
    .slice()
    .sort((dateA, dateB) => new Date(dateA.date) - new Date(dateB.date));
  return (
    <>
      <DayHeader iconGoBack={goback}>Day Planer</DayHeader>
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
              to={`/details/${id}/day_${index + 1}(${getDisplayDate(
                data.date
              )})`}
              style={linkStyle}
            >
              <DayCard
                key={index}
                routeNumber={index + 1}
                data={data}
                startDate={detailDestination[0]?.startDate}
              />
            </Link>
          ))
        ) : (
          <p>You haven't planned any of your days in {id}</p>
        )}
      </CardWrapper>
      <Button link={`/details/${id}/dayplaner/plannewday`}>
        Plan another day
      </Button>
    </>
  );
}
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
  width: fit-content;
  margin-bottom: 0;
  font-size: 2em;
  font-weight: bold;
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
`;

const CardWrapper = styled.section`
  display: grid;
  gap: 10px;
`;

const linkStyle = {
  textDecoration: 'none',
  color: '#F3F4F6',
};
