import React from 'react';
import * as effector from 'effector-react';
import { render, fireEvent } from '@testing-library/react';

import { PilotSearch } from './index';

const pilots = [
  'Adrian Thomas',
  'Helen Gant',
  'Gordon Macgregor',
  'Richard Bungay',
  'Judith Mole',
  'Andy Young',
  'Tanya Ephgrave',
  'David Thomson'
];

const useStoreMock = jest.spyOn(effector, 'useStore');
useStoreMock.mockReturnValue(pilots);

describe('my function or component', () => {
  test('does the following', () => {
    const searchTerm = 'Thom';
    const pattern = new RegExp(`${searchTerm}`, 'i');
    const buttons = pilots.filter(pilot => pattern.test(pilot));
    const container = render(<PilotSearch data={pilots} />);
    const input = container.getByTestId('pilot-search');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: searchTerm } });
    expect(buttons.length).toBe(2);
  });
});
