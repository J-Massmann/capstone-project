import styled from 'styled-components';

export default function TripCard({ id, place, startDate, endDate }) {
  const currentStartDate = new Date(startDate);
  const startYYYY = currentStartDate.getFullYear();
  let startMM = currentStartDate.getMonth() + 1;
  let startDD = currentStartDate.getDate();
  if (startDD < 10) startDD = '0' + startDD;
  if (startMM < 10) startMM = '0' + startMM;
  const displayStartDate = startDD + '.' + startMM + '.' + startYYYY;

  const currentEndDate = new Date(endDate);
  const endYYYY = currentEndDate.getFullYear();
  let endMM = currentEndDate.getMonth() + 1;
  let endDD = currentEndDate.getDate();
  if (endDD < 10) endDD = '0' + endDD;
  if (endMM < 10) endMM = '0' + endMM;
  const displayEndDate = endDD + '.' + endMM + '.' + endYYYY;
  return (
    <Wrapper key={id}>
      <h2>{place}</h2>
      <p>
        {displayStartDate} - {displayEndDate}
      </p>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border: 1px solid #bfc2c8;
  padding: 0 5px;
`;
