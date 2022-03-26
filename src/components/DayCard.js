import styled from 'styled-components';

export default function DayCard({ dayNumber, routeNumber, date }) {
  return (
    <Wrapper>
      <h3>Day {dayNumber}</h3>
      <span>
        Route {routeNumber} - {date}
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  border: 1px solid var(--font-color);
  padding: 10px;
  border-radius: 14px;
  h3 {
    margin-top: 0px;
  }
`;
