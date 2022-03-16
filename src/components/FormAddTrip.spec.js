import FormAddTrip from './FormAddTrip.js';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Form', () => {
  it('renders two inputs, a selct and two button', () => {
    render(
      <MemoryRouter>
        <FormAddTrip />
      </MemoryRouter>
    );
    const input1 = screen.getByLabelText(/destination/i);
    const input2 = screen.getByLabelText(/location/i);
    const select = screen.getByLabelText(/status/i);
    const buttons = screen.getAllByRole('button');

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });
});
