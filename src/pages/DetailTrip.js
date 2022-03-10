import { useParams } from 'react-router-dom';

export default function DetailTrip() {
  const { id } = useParams();

  return <div>Test - {id}</div>;
}
