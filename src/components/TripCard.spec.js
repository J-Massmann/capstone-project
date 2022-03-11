import TripCard from './TripCard.js';
import { render, screen } from '@testing-library/react';

describe('TripCard', () => {
  it('renders a section and a header', () => {
    render(<TripCard id={'123'} place={'Barcelona'} />);

    const nameOfDestination = screen.getByText('Barcelona');

    expect(nameOfDestination).toBeInTheDocument();
  });
});
