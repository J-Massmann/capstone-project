import GlobalStyles from '../src/GlobalStyles';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <>
      <GlobalStyles />
      <Story />
    </>
  ),
];

addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
));
