import FormAddTrip from './FormAddTrip.js';
import FormEditTrip from './FormEditTrip.js';

export default {
  title: 'Components/Form',
  component: FormAddTrip,
};

const TemplateAdd = () => <FormAddTrip />;
export const Default = TemplateAdd.bind({});

const templateEdit = args => <FormEditTrip {...args} />;
export const Edit = templateEdit.bind({});
Edit.args = {
  destination: {
    id: 123,
    place: 'Barcelona',
    startDate: new Date(2022, 6, 10),
    endDate: new Date(2022, 7, 10),
    locations: ['Park Güell'],
  },
};
