import { Routes, Route, Navigate } from 'react-router-dom';
import FutureTrips from './pages/FutureTrips.js';
import PastTrips from './pages/PastTrips.js';
import { nanoid } from 'nanoid';
import { useImmer } from 'use-immer';
import DetailTrip from './pages/DetailTrip.js';
import FormNewTrip from './pages/FormNewTrip.js';
import styled from 'styled-components';

export default function App() {
  const [destinations, updateDestinations] = useImmer([
    {
      id: nanoid(),
      place: 'Barcelona',
      locations: ['Sagrada Familia', 'Park Güell'],
      isTripFuture: true,
    },
    {
      id: nanoid(),
      place: 'New York',
      locations: ['Brooklyn Bridge', 'Central Park'],
      isTripFuture: true,
    },
    {
      id: nanoid(),
      place: 'Tokyo',
      locations: ['Senso-ji', 'Imperial Palace'],
      isTripFuture: false,
    },
  ]);

  function handleTripStatus(destinationId) {
    updateDestinations(draft => {
      const destination = draft.find(
        destination => destination.id === destinationId
      );
      destination.isTripFuture = !destination.isTripFuture;
    });
  }

  function addNewDestination(newData) {
    updateDestinations(draft => {
      draft.push(newData);
    });
  }

  return (
    <AppGrid>
      <Routes>
        <Route path="*" element={<Navigate to="/futuretrips" replace />} />
        <Route
          path="/futuretrips"
          element={<FutureTrips destinations={destinations} />}
        />
        <Route
          path="/futuretrips/:id"
          element={
            <DetailTrip
              destinations={destinations}
              handleTripStatus={handleTripStatus}
            />
          }
        />
        <Route
          path="/pasttrips"
          element={<PastTrips destinations={destinations} />}
        />
        <Route
          path="/newtrip"
          element={<FormNewTrip onAddNewDestination={addNewDestination} />}
        />
      </Routes>
    </AppGrid>
  );
}

const AppGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;
