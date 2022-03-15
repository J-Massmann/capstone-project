import Modal from './Modal.js';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Modal', () => {
  it('renders a Modal', () => {
    render(
      <MemoryRouter>
        <Modal open={true} children={'Your Trip has been saved'} />
      </MemoryRouter>
    );
    const PopUp = screen.getByText(/Trip/i);
    expect(PopUp).toBeInTheDocument();
  });
});
