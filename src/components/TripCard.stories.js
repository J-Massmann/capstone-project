import TripCard from './TripCard.js';

export default {
  title: 'Component/TripCard',
  component: TripCard,
};

const Template = args => <TripCard {...args} />;
export const TripCardFuture = Template.bind({});
TripCardFuture.args = {
  id: 12345,
  place: 'Barcelona',
  locations: ['Sagrada Familia', 'Park Güell'],
  isTripFuture: true,
};

export const TripCardPast = Template.bind({});
TripCardPast.args = {
  id: 123456,
  place: 'Tokyo',
  locations: ['Senso-ji', 'Imperial Palace'],
  isTripFuture: false,
};
