import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { DistanceSearch } from './index';

describe('DistanceSearch', () => {
  test('Clicking score button should call handler with id Number', () => {
    const handleClick = jest.fn();
    const value = '250';

    render(<DistanceSearch handleClick={handleClick} />);
    const button = screen.getByTestId(value);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledWith(parseInt(value));
  });
});
