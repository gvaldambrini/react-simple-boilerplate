import React from 'react';
import StoryRouter from 'storybook-react-router';
import { storiesOf } from '@storybook/react';
import TestRouteComponent from './Test';

const storyRouterConfig = [
  {},
  { initialEntries: ['/foo'] },
];

const getRouterDecorator = () => StoryRouter(...storyRouterConfig);

storiesOf('Test', module)
  .addParameters({
    info: 'some info',
  })
  .addDecorator(getRouterDecorator())
  .add('with val = foo', () => (
    <TestRouteComponent val="val" />
  ));