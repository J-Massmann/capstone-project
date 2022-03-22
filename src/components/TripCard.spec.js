import TripCard from './TripCard.js';
import { render, screen } from '@testing-library/react';

describe('TripCard', () => {
  it('renders a section, a header, a paragraph', () => {
    render(
      <TripCard
        id={'123'}
        place={'Barcelona'}
        startDate={'10.06.2022'}
        endDate={'10.07.2022'}
      />
    );

    const nameOfDestination = screen.getByText('Barcelona');
    const date = screen.getByText(/2022/i);

    expect(nameOfDestination).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
});
