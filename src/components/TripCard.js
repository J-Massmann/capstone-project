import styled from 'styled-components';
import { nanoid } from 'nanoid';

export default function TripCard() {
  const destinations = [
    {
      id: nanoid(),
      place: 'Barcelona',
      locations: ['Sagrada Familia', 'Park Güell'],
    },
    {
      id: nanoid(),
      place: 'Tokyo',
      locations: ['Senso-ji', 'Imperial Palace'],
    },
  ];
  console.log(destinations);
  return (
    <DestinationWrapper>
      {destinations.map(destination => (
        <Wrapper key={destination.id}>
          <h2>{destination.place}</h2>
          <ul>
            {destination.locations.map(location => (
              <li key={location.index}>{location}</li>
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
