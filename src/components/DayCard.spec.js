import DayCard from './DayCard.js';
import { render, screen } from '@testing-library/react';

describe('DayCard', () => {
  it('renders an article with a header and a paragrpah', () => {
    render(<DayCard dayNumber={1} routeNumber={1} date={'26.03.2022'} />);

    const day = screen.getByText('Day 1');
    const date = screen.getByText(/2022/i);

    expect(day).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
});
