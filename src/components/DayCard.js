import styled from 'styled-components';
import getDisplayDate from './hooks/getDisplayDate.js';

export default function DayCard({ routeNumber, data, startDate }) {
  const date = getDisplayDate(data.date);
  const daysDiff = (new Date(data.date) - new Date(startDate)) / 86400000;
  return (
    <Wrapper key={routeNumber}>
      <h3>Route {routeNumber} </h3>
      <span>
        Day {daysDiff + 1} - {date}
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border: 2px solid var(--bg-color-content);
  padding: 10px;
  border-radius: 14px;
  box-shadow: 0 2px 5px rgba(191, 194, 200, 0.5);
  h3 {
    margin-top: 0px;
  }
`;
