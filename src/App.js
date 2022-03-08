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
      status: 'future',
    },
    {
      id: nanoid(),
      place: 'Tokyo',
      locations: ['Senso-ji', 'Imperial Palace'],
      status: 'past',
    },
  ]);
  return (
    <div>
      <ToggleBar />
      <Routes>
        <Route
          path="/"
          element={
            <FutureTrips
              destinations={destinations}
              updateDestinations={updateDestinations}
            />
          }
        />
        <Route
          path="/pasttrips"
          element={
            <PastTrips
              destinations={destinations}
              updateDestinations={updateDestinations}
            />
          }
        />
      </Routes>
    </div>
  );
}
