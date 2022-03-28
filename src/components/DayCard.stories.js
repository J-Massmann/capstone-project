import DayCard from './DayCard.js';

export default {
  title: 'Component/DayCard',
  component: DayCard,
};

const Template = args => <DayCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  routeNumber: 1,
  data: {
    date: 'Mon May 02 2022 00:00:00 GMT+0200 (Central European Summer Time)',
  },
};
