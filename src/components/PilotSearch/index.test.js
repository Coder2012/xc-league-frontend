import React from 'react';
import * as effector from 'effector-react';
import { render, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

import { PilotSearch } from './index';

const pilots = [
  'Adrian Thomas',
  'Helen Gant',
  'Gordon Macgregor',
  'Richard Bungay',
  'Judith Mole',
  'Andy Young',
  'Tanya Ephgrave',
  'David Thomson',
];

const repeatPilots = [
  'Neil Brown',
  'Neil Charles',
  'Neil Cruickshank',
  'Neil Furmidge',
  'Neil Hutchison',
  'Neil McCain',
  'Neil Morgan',
  'Neil Morley',
  'Neil Plant',
  'Neil Roberts',
  'Neil Rollings',
  'Neil Speed',
  'Neil Wheeler',
];

describe('Pilot Search', () => {
  test('Should reveal two pilot results', () => {
    const useStoreMock = jest.spyOn(effector, 'useStore');
    useStoreMock.mockReturnValue(pilots);

    const searchTerm = 'Thom';
    const container = render(<PilotSearch data={pilots} />);

    const input = container.getByTestId('pilot-search');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: searchTerm } });

    expect(container.queryByText('Show more')).not.toBeInTheDocument();
    expect(container.queryByText('Helen Gant')).not.toBeInTheDocument();
    expect(container.getByText('Adrian Thomas')).toBeInTheDocument();
    expect(container.getByText('David Thomson')).toBeInTheDocument();
  });

  test('Should reveal show more button', () => {
    const useStoreMock = jest.spyOn(effector, 'useStore');
    useStoreMock.mockReturnValue(repeatPilots);

    const searchTerm = 'Neil';
    const container = render(<PilotSearch data={repeatPilots} />);

    const input = container.getByTestId('pilot-search');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: searchTerm } });

    expect(container.getByText('Show more')).toBeInTheDocument();
  });
});
