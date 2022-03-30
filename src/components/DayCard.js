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
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
  h3 {
    margin-top: 0px;
  }
`;
