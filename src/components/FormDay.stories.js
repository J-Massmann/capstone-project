import FormDay from './FormDay.js';
import getDates from './hooks/getDates.js';

export default {
  title: 'Component/Form',
  component: FormDay,
};

const Template = args => <FormDay {...args} />;
export const Default = Template.bind({});
Default.args = {
  currentDestination: [
    {
      id: '123',
      place: 'Berlin',
      endDate: '2022-05-07T22:00:00.000Z',
      startDate: '2022-05-01T22:00:00.000Z',
      locations: ['Roter Rabe'],
      routes: [{ date: '2022-05-01T22:00:00.000Z', locations: ['Roter Rabe'] }],
    },
  ],
  dates: getDates(
    new Date('2022-05-01T22:00:00.000Z'),
    new Date('2022-05-07T22:00:00.000Z')
  ),
  buttonName: 'create',
};
