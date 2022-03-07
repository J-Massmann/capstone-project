import TripCard from './TripCard.js';
import { render, screen } from '@testing-library/react';

describe('TripCard', () => {
  it('renders two sections and two list items', () => {
    render(<TripCard />);

    const nameOfDestination1 = screen.getByText('Barcelona');
    const nameOfDestination2 = screen.getByText('Tokyo');
    const listItems = screen.getAllByRole('listitem');

    expect(nameOfDestination1).toBeInTheDocument();
    expect(nameOfDestination2).toBeInTheDocument();
    expect(listItems).toHaveLength(4);
  });
});
