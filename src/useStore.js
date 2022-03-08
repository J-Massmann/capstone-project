import create from 'zustand';
import { nanoid } from 'nanoid';
import produce from 'immer';

const useStore = create(set => ({
  destinations: [
    {
      id: nanoid(),
      place: 'Barcelona',
      locations: ['Sagrada Familia', 'Park Güell'],
      status: 'future',
    },
    {
      id: nanoid(),
      place: 'Tokyo',
      locations: ['Senso-ji', 'Imperial Palace'],
      status: 'past',
    },
  ],
}));

export default useStore;
