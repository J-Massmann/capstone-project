import TripCard from '../components/TripCard.js';

export default function FutureTrips({ destinations, updateDestinations }) {
  const futureDestinations = destinations.filter(destination => {
    return destination.status === 'future';
  });
  return (
    <>
      {futureDestinations.map(destination => (
        <TripCard
          id={destination.id}
          place={destination.place}
          locations={destination.locations}
          status={destination.status}
          updateDestinations={updateDestinations}
        />
      ))}
    </>
  );
}
