import React from 'react';
import * as effector from 'effector-react';
import { render, fireEvent, screen } from '@testing-library/react';

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
    render(<PilotSearch />);

    const input = screen.getByTestId('pilot-search');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: searchTerm } });

    expect(screen.queryByText('Show more')).not.toBeInTheDocument();
    expect(screen.queryByText('Helen Gant')).not.toBeInTheDocument();
    expect(screen.getByText('Adrian Thomas')).toBeInTheDocument();
    expect(screen.getByText('David Thomson')).toBeInTheDocument();
  });

  test('Should reveal show more button', () => {
    const useStoreMock = jest.spyOn(effector, 'useStore');
    useStoreMock.mockReturnValue(repeatPilots);

    const searchTerm = 'Neil';
    render(<PilotSearch />);

    const input = screen.getByTestId('pilot-search');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: searchTerm } });

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
