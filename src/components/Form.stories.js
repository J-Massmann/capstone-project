import Form from './Form.js';

export default {
  title: 'Component/Form',
  component: Form,
};

const TemplateAdd = args => <Form {...args} />;
export const Default = TemplateAdd.bind({});
Default.args = {
  initialState: {
    startDate: '',
    endDate: '',
    focusedInput: '',
  },
};

const templateEdit = args => <Form {...args} />;
export const Edit = templateEdit.bind({});
Edit.args = {
  destination: {
    id: 123,
    place: 'Barcelona',
    locations: ['Park Güell'],
  },
  initialState: {
    startDate: new Date(2022, 5, 10),
    endDate: new Date(2022, 6, 10),
    focusedInput: null,
  },
};
