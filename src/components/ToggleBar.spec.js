import ToggleBar from './ToggleBar.js';
import { ToggleButton } from './ToggleBar.js';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('ToggleBar', () => {
  it('renders two anchors', () => {
    render(
      <MemoryRouter>
        <ToggleBar />
      </MemoryRouter>
    );
    const futureAnchor = screen.getByText('future');
    const pastAnchor = screen.getByText('past');

    expect(futureAnchor).toBeInTheDocument();
    expect(pastAnchor).toBeInTheDocument();
  });
});

describe('ToggleButton', () => {
  it('renders two buttons which have a toggle function', () => {
    const switchStatus = jest.fn();
    render(
      <ToggleButton isTripFuture={true} onHandleTripStatus={switchStatus} />
    );

    const toggleButton = screen.getAllByRole('button');
    const toggleButton1 = screen.getByText('future');
    userEvent.click(toggleButton1);

    expect(toggleButton).toHaveLength(2);
    expect(switchStatus).toHaveBeenCalled();
  });
});
