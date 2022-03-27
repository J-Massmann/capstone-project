import FormDay from './FormDay.js';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('FormAdd', () => {
  const currentDestination = [
    {
      id: '123',
      place: 'Berlin',
      endDate: '2022-05-07T22:00:00.000Z',
      startDate: '2022-05-01T22:00:00.000Z',
      locations: ['Roter Rabe'],
      routes: [{ date: '2022-05-01T22:00:00.000Z', locations: ['Roter Rabe'] }],
    },
  ];
});
