import create from 'zustand';
import { nanoid } from 'nanoid';
import produce from 'immer';

const useStore = create(set => ({
  destinations: [
    {
      id: nanoid(),
      place: 'Barcelona',
      locations: ['Sagrada Familia', 'Park Güell'],
      isTripFuture: true,
      setStatus: () =>
        set(
          produce(state => {
            state.isTripFuture = false;
          })
        ),
    },
    // {
    //   id: nanoid(),
    //   place: 'Tokyo',
    //   locations: ['Senso-ji', 'Imperial Palace'],
    //   isTripFuture: false,
    //   setStatus: () =>
    //     set(
    //       produce(state => {
    //         state.isTripFuture = !state.isTripFuture;
    //       })
    //     ),
    // },
  ],
}));

export default useStore;
