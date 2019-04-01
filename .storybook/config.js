import { configure } from '@storybook/react';

function loadStories() {
  require('../src/map.stories');
}

configure(loadStories, module);
