import ToggleBar from './components/ToggleBar.js';
import { Routes, Route } from 'react-router-dom';
import FutureTrips from './pages/FutureTrips.js';
import PastTrips from './pages/PastTrips.js';
import { nanoid } from 'nanoid';
import { useImmer } from 'use-immer';

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

  return (
    <div>
      <ToggleBar />
      <Routes>
        <Route
          path="/"
          element={
            <FutureTrips
              destinations={destinations}
              handleTripStatus={handleTripStatus}
            />
          }
        />
        <Route
          path="/pasttrips"
          element={
            <PastTrips
              destinations={destinations}
              handleTripStatus={handleTripStatus}
            />
          }
        />
      </Routes>
    </div>
  );
}
