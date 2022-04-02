import Button from './Button.js';
import { SubmitButton } from './Button.js';

export default {
  title: 'Component/Button',
  component: Button,
};

const Template = args => <Button {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: 'Plan another day',
  link: '/',
};

const SubmitTemplate = args => <SubmitButton {...args} />;
export const Submit = SubmitTemplate.bind({});
Submit.args = {
  children: 'Save',
};
