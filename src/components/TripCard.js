import styled from 'styled-components';

export default function TripCard() {
  const destinations = [
    {
      place: 'Barcelona',
      locations: ['Sagrada Familia', 'Park Güell'],
    },
    {
      place: 'Tokyo',
      locations: ['Senso-ji', 'Imperial Palace'],
    },
  ];
  return (
    <DestinationWrapper>
      {destinations.map(destination => (
        <Wrapper>
          <h1>{destination.place}</h1>
          <ul>
            {destination.locations.map(location => (
              <li>{location}</li>
            ))}
          </ul>
        </Wrapper>
      ))}
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
