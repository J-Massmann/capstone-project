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
};
