import ToggleBar from './ToggleBar.js';

export default {
  title: 'Component/ToggleBar',
  component: ToggleBar,
};

const TemplateBar = () => <ToggleBar />;
export const Navigation = TemplateBar.bind({});
