import TripCard from './TripCard.js';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

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

  it('renders a button which toggles the status of a trip', () => {
    render(
      <TripCard
        id={'123'}
        place={'Barcelona'}
        locations={['Sgrada Familia', 'Park Güell']}
        isTripFuture={true}
      />
    );

    const toggleButton = screen.getByRole('button');

    expect(toggleButton).toBeInTheDocument();
  });

  it('clicking the button toggles the status of the trip', () => {
    const switchStatus = jest.fn();
    render(
      <TripCard
        handleTripStatus={switchStatus}
        id={'123'}
        place={'Barcelona'}
        locations={['Sgrada Familia', 'Park Güell']}
        isTripFuture={true}
      />
    );

    const toggleButton = screen.getByRole('button');

    userEvent.click(toggleButton);
    expect(switchStatus).toHaveBeenCalled();
  });
});
