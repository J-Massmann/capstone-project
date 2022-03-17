import Modal from './Modal.js';
import { DeleteModal } from './Modal.js';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { click } from '@testing-library/user-event/dist/click';

describe('Modal', () => {
  it('renders a Modal', () => {
    render(
      <MemoryRouter>
        <Modal open={true} children={'Your Trip has been saved'} />
      </MemoryRouter>
    );
    const PopUp = screen.getByLabelText(/Trip/i);
    expect(PopUp).toBeInTheDocument();
  });
});

describe('DeleteModal', () => {
  it('renders a Modal with two buttons', () => {
    render(
      <DeleteModal open={true} children={'Are you sure you want to delete?'} />
    );

    const DeleteMessage = screen.getByLabelText(/delete/i);
    const buttons = screen.getAllByRole('button');

    expect(DeleteMessage).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });

  it('calls the cancelFunction by clicking the no-Button', () => {
    const cancleFunction = jest.fn();
    render(
      <DeleteModal
        open={true}
        setOpen={cancleFunction}
        children={'Are you sure you want to delete?'}
      />
    );
    const NoButton = screen.getByLabelText(/no/i);
    userEvent.click(NoButton);

    expect(cancleFunction).toHaveBeenCalled();
  });
});

it('calls the deleteFunction by clicking the yes-Button', () => {
  const deleteFunction = jest.fn();
  render(
    <DeleteModal
      open={true}
      handleDelete={deleteFunction}
      children={'Are you sure you want to delete?'}
    />
  );
  const YesButton = screen.getByLabelText(/yes/i);
  userEvent.click(YesButton);

  expect(deleteFunction).toHaveBeenCalled();
});
