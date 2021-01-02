import 'whatwg-fetch';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { App } from './App';
import { pilots } from './__mock__/flights/data';

jest.mock('./helpers/viewport');
jest.mock('@sentry/browser');
jest.mock('react-ga');

const server = setupServer(
  rest.get('http://localhost:3000/flights/pilots', (req, res, ctx) => {
    return res(ctx.json({ pilots }));
  })
);

describe('App tests', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  test('retrieves pilots on App startup', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const button = screen.getByText(/search by pilot name/i);
    userEvent.click(button);

    await waitFor(() => {
      screen.getByLabelText(/enter pilot name/i);
    });

    userEvent.type(screen.getByLabelText(/enter pilot name/i), 'Neil');

    await waitFor(() => {
      screen.getAllByText(/Neil/i);
    });

    expect(screen.getByText(/Neil Brown/i)).toBeInTheDocument();
  });
});
