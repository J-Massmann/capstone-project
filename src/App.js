import { Routes, Route, Navigate } from 'react-router-dom';
import FutureTrips from './pages/FutureTrips.js';
import PastTrips from './pages/PastTrips.js';
import { useImmer } from 'use-immer';
import DetailTrip from './pages/DetailTrip.js';
import FormNewTrip from './pages/FormNewTrip.js';
import styled from 'styled-components';
import { useEffect } from 'react';
import EditTrips from './pages/EditTrip.js';
import produce from 'immer';

export default function App() {
  const [destinations, updateDestinations] = useImmer(
    loadFromLocal('Trips') ?? []
  );

  useEffect(() => {
    saveToLocal('Trips', destinations);
  }, [destinations]);

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

  function editDestination(handleData) {
    updateDestinations(draft => {
      const destination = draft.find(
        destination => destination.id === handleData.id
      );
      destination.place = handleData.place;
      destination.locations = handleData.locations;
      destination.isTripFuture = handleData.isTripFuture;
    });
  }

  function deleteDestination(destinationId) {
    updateDestinations(draft => {
      draft.splice(
        draft.findIndex(destination => destination.id === destinationId),
        1
      );
    });
  }

  function saveToLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function loadFromLocal(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log(error);
    }
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
          path="/details/:id"
          element={
            <DetailTrip
              destinations={destinations}
              handleTripStatus={handleTripStatus}
              onDeleteDestination={deleteDestination}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditTrips
              destinations={destinations}
              onEditDestination={editDestination}
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
