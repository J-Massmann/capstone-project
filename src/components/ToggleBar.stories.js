import ToggleBar from './ToggleBar.js';
import { ToggleButton } from './ToggleBar.js';

export default {
  title: 'Component/ToggleBar',
  component: ToggleBar,
};

const TemplateBar = () => <ToggleBar />;
export const Navigation = TemplateBar.bind({});

const TemplateButton = args => <ToggleButton {...args} />;
export const switchButtons = TemplateButton.bind({});
switchButtons.args = {
  isTripFuture: true,
};
