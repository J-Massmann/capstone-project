import TripCard from './TripCard.js';
import { render, screen } from '@testing-library/react';

describe('TripCard', () => {
  it('renders a section and two list items', () => {
    render(
      <TripCard
        id={'123'}
        place={'Barcelona'}
        locations={['Sgrada Familia', 'Park Güell']}
        isTripFuture={true}
      />
    );

    const nameOfDestination = screen.getByText('Barcelona');
    const listItems = screen.getAllByRole('listitem');

    expect(nameOfDestination).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
  });
});
