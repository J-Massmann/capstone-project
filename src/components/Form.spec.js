import Form from './Form.js';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('FormAdd', () => {
  const initialValues = {
    startDate: new Date(2022, 5, 10),
    endDate: new Date(2022, 6, 10),
    focusedInput: null,
  };
  render(
    <MemoryRouter>
      <Form initialState={initialValues} />
    </MemoryRouter>
  );
  it('renders four inputs and four buttons (two search buttons)', () => {
    const input1 = screen.getByPlaceholderText(/e.g./i);
    const input2 = screen.getByPlaceholderText(/add a place/i);
    const dateInputs = screen.getAllByLabelText(/date/i);
    const buttons = screen.getAllByRole('button');

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(dateInputs).toHaveLength(2);
    expect(buttons).toHaveLength(4);
  });
});
