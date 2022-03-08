import styled from 'styled-components';

export default function TripCard({
  id,
  place,
  locations,
  status,
  updateDestinations,
}) {
  function setStatus(id) {
    updateDestinations(destination => {
      destination[id].status = 'future';
    });
  }
  return (
    <DestinationWrapper>
      <Wrapper key={id}>
        <h2>{place}</h2>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>{location}</li>
          ))}
        </ul>
        <ToggleButtonWrapper>
          <p>switch to:</p>
          <button onClick={setStatus(id)} type="button" name="ToggleButton">
            {status === 'future' ? 'past' : 'future'}
          </button>
        </ToggleButtonWrapper>
      </Wrapper>
    </DestinationWrapper>
  );
}

const Wrapper = styled.section`
  border: 1px solid #bfc2c8;
  padding: 0 5px;
`;

const DestinationWrapper = styled.main`
  display: grid;
  gap: 10px;
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
