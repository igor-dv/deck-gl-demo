import React from 'react';
import { storiesOf } from '@storybook/react';
import { Map } from './map.component';

storiesOf('Map', module)
  .add('deck-gl', () => (
    <Map />
  ));
