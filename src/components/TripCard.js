import styled from 'styled-components';
import getDisplayDate from './hooks/getDisplayDate.js';

export default function TripCard({ id, place, startDate, endDate }) {
  const currentStartDate = getDisplayDate(new Date(startDate));
  const currentEndDate = getDisplayDate(new Date(endDate));
  return (
    <Wrapper key={id}>
      <h2>{place}</h2>
      <p>
        {currentStartDate} - {currentEndDate}
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border: 2px solid var(--bg-color-content);
  border-radius: 14px;
  padding: 0 5px;
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
`;
