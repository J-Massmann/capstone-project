import TripCard from '../components/TripCard.js';

export default function PastTrips({ destinations, updateDestinations }) {
  const futureDestinations = destinations.filter(destination => {
    return destination.status === 'past';
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
