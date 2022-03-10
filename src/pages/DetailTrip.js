import { useParams } from 'react-router-dom';

export default function DetailTrip({ destinations }) {
  const { id } = useParams();
  const detailDestination = destinations.filter(destination => {
    return destination.place === id;
  });
  console.log(detailDestination);

  return (
    <>
      {detailDestination.map(trip => (
        <section>
          <h1>{trip.place}</h1>
          <button>{trip.isTripFuture === true ? 'past' : 'future'}</button>
          <ul>
            {trip.locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
