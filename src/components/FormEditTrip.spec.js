import FormEditTrip from './FormEditTrip.js';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe(
  'FormEdit',
  () => {
    const testDestination = {
      id: 123,
      place: 'Barcelona',
      isTripFuture: true,
      locations: ['Park Güell', 'Camp Nou'],
    };
    render(
      <MemoryRouter>
        <FormEditTrip destination={testDestination} />
      </MemoryRouter>
    );
  },
  it('renders two inputs, a select and two buttons', () => {
    const input1 = screen.getByLabelText(/destination/i);
    const input2 = screen.getByLabelText(/location/i);
    const select = screen.getByLabelText(/status/i);
    const buttons = screen.getAllByRole('button');

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  })
);
