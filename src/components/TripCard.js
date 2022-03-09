import styled from 'styled-components';

export default function TripCard({
  id,
  place,
  locations,
  isTripFuture,
  handleTripStatus,
}) {
  return (
    <Wrapper key={id}>
      <h2>{place}</h2>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>{location}</li>
        ))}
      </ul>
      <ToggleButtonWrapper>
        <p>switch to:</p>
        <button
          id={id}
          onClick={handleTripStatus}
          type="button"
          name="ToggleButton"
        >
          {isTripFuture === true ? 'past' : 'future'}
        </button>
      </ToggleButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border: 1px solid #bfc2c8;
  padding: 0 5px;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 5px;
  margin-bottom: 5px;

  & p {
    margin: 0;
  }

  button {
    background-color: var(--bg-color-content);
  }
`;
