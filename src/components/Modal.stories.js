import Modal from './Modal.js';
import { DeleteModal } from './Modal.js';

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

const DeleteTemplate = args => <DeleteModal {...args} />;
export const DeleteMessage = DeleteTemplate.bind({});
DeleteMessage.args = {
  open: true,
  children: 'Are you sure that you want to delete the trip?',
};
