import FormEditTrip from './FormEditTrip.js';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe(
  'FormEdit',
  () => {
    const testDestination = {
      id: 123,
      place: 'Barcelona',
      startDate: new Date(2022, 6, 10),
      endDate: new Date(2022, 7, 10),
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
    const dateInputs = screen.getAllByLabelText(/date/i);
    const buttons = screen.getAllByRole('button');

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(dateInputs).toHaveLength(2);
    expect(buttons).toHaveLength(2);
  })
);
