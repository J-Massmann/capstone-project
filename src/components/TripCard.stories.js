import TripCard from './TripCard.js';

export default {
  title: 'Component/TripCard',
  component: TripCard,
};

const Template = args => <TripCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  id: '1',
  place: 'Barcelona',
  startDate: '2022-07-07T22:00:00.000Z',
  endDate: '2022-07-01T22:00:00.000Z',
};
