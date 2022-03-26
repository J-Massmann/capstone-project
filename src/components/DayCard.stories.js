import DayCard from './DayCard.js';

export default {
  title: 'Component/DayCard',
  component: DayCard,
};

const Template = args => <DayCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  dayNumber: 1,
  routeNumber: 1,
  date: '26.03.2022',
};
