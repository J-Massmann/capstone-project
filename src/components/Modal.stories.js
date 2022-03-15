import Modal from './Modal.js';

export default {
  title: 'Component/Modal',
  component: Modal,
};

const Template = args => <Modal {...args} />;
export const PopUp = Template.bind({});
PopUp.args = {
  open: true,
  children: 'Your Trip has been saved',
};
