import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import Dayplaner from './pages/DayPlaner.js';
import DetailTrip from './pages/DetailTrip.js';
import EditTrips from './pages/EditTrip.js';
import FormNewDay from './pages/FormNewDay.js';
import FormNewTrip from './pages/FormNewTrip.js';
import FutureTrips from './pages/FutureTrips.js';
import PastTrips from './pages/PastTrips.js';
import DetailDay from './pages/DetailDay.js';
import EditDay from './pages/EditDay.js';
import { current } from 'immer';
import { ids } from 'webpack';

export default function App() {
  const [destinations, updateDestinations] = useImmer(
    loadFromLocal('Trips') ?? []
  );

  useEffect(() => {
    saveToLocal('Trips', destinations);
  }, [destinations]);

  function addNewDestination(newData) {
    updateDestinations(draft => {
      draft.push(newData);
    });
  }

  function getCurrentDestination(id) {
    const detailDestination = destinations?.filter(destination => {
      return destination.place === id;
    });
    return detailDestination;
  }

  function editDestination(handleData) {
    updateDestinations(draft => {
      const destination = draft.find(
        destination => destination.id === handleData.id
      );
      destination.place = handleData.place;
      destination.locations = handleData.locations;
      destination.startDate = handleData.startDate;
      destination.endDate = handleData.endDate;
    });
  }

  function addRoute(handleData, routes) {
    updateDestinations(draft => {
      const destination = draft.find(
        destination => destination.id === handleData.id
      );
      destination.routes = [...destination.routes, routes];
      console.log(destination);
    });
  }

  function editRoute(handleData, routes) {
    updateDestinations(draft => {
      const currentDestination = draft.find(
        destination => destination.id === handleData.id
      );
      const currentRoute = currentDestination.routes.find(
        route => route.date === routes.date
      );
      currentRoute.locations = routes.locations;
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

  function deleteRoute(id, route) {
    updateDestinations(draft => {
      const currentDestination = draft.find(
        destination => destination.id === id
      );
      currentDestination.routes.splice(
        draft.findIndex(singleroute => singleroute.date === route.date),
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
              onGetCurrentDestination={getCurrentDestination}
              onDeleteDestination={deleteDestination}
            />
          }
        />
        <Route
          path="/details/:id/dayplaner"
          element={
            <Dayplaner onGetCurrentDestination={getCurrentDestination} />
          }
        />
        <Route
          path="/details/:id/day_:daydate(:date)"
          element={
            <DetailDay
              onGetCurrentDestination={getCurrentDestination}
              onDeleteDay={deleteRoute}
            />
          }
        />

        <Route
          path="/details/:id/edit/day_:daydate(:date)"
          element={
            <EditDay
              onGetCurrentDestination={getCurrentDestination}
              onEditDestination={editRoute}
            />
          }
        />

        <Route
          path="/details/:id/dayplaner/plannewday"
          element={
            <FormNewDay
              onGetCurrentDestination={getCurrentDestination}
              onAddRoute={addRoute}
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
