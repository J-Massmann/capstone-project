import FormAddTrip from './FormAddTrip.js';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('FormAdd', () => {
  render(
    <MemoryRouter>
      <FormAddTrip />
    </MemoryRouter>
  );
  it('renders four inputs and two buttons', () => {
    const input1 = screen.getByLabelText(/destination/i);
    const input2 = screen.getByLabelText(/location/i);
    const dateInputs = screen.getAllByLabelText(/date/i);
    const buttons = screen.getAllByRole('button');

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(dateInputs).toHaveLength(2);
    expect(buttons).toHaveLength(2);
  });
});
