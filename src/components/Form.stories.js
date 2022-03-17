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
    isTripFuture: false,
    locations: ['Park Güell'],
  },
};
