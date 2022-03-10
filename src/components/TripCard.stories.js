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
  locations: ['Sagrada Familia', 'Park Güell'],
  isTripFuture: true,
};

export const TripCardPast = Template.bind({});
TripCardPast.args = {
  id: '2',
  place: 'Tokyo',
  locations: ['Senso-ji', 'Imperial Palace'],
  isTripFuture: false,
};
