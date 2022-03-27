import styled from 'styled-components';
import getDisplayDate from './hooks/getDisplayDate.js';

export default function DayCard({ routeNumber, data }) {
  console.log(data);
  const date = getDisplayDate(data.date);
  return (
    <Wrapper>
      <h3>Route {routeNumber} </h3>
      <span>{date}</span>
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
