import styled from 'styled-components';

export default function TripCard({ id, place }) {
  return (
    <Wrapper key={id}>
      <h2>{place}</h2>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border: 1px solid #bfc2c8;
  padding: 0 5px;
`;
