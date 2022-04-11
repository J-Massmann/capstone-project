import Button from './Button.js';
import { SubmitButton } from './Button.js';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Button', () => {
  it('renders a button and an anchor', () => {
    render(
      <MemoryRouter>
        <Button link={'/'}>Create</Button>
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    const anchor = screen.getByText(/create/i);

    expect(button).toBeInTheDocument();
    expect(anchor).toBeInTheDocument();
  });
});

describe('SubmitButton', () => {
  it('renders a button, span and image', () => {
    render(<SubmitButton condition={false}>Submit</SubmitButton>);

    const button = screen.getByRole('button');
    const span = screen.getByText(/submit/i);
    const image = screen.getByAltText(/success/i);

    expect(button).toBeInTheDocument();
    expect(span).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
