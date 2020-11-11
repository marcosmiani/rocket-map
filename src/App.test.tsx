import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders basic elements correctly without failing', () => {
  render(<App />);
  const searchDateFrom = screen.getByTestId(/date-from/i)
  expect(searchDateFrom).toBeInTheDocument();
  const searchDateTo = screen.getByTestId(/date-to/i)
  expect(searchDateTo).toBeInTheDocument();

  const searchButtonElement = screen.getByTestId(/search-button/i)
  expect(searchButtonElement).toBeInTheDocument();

  const mapElement = screen.getByTestId(/map/i)
  expect(mapElement).toBeInTheDocument();
});
