import Button from './Button.js';

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
