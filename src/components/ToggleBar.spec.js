import ToggleBar from './ToggleBar.js';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

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
