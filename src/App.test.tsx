import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders basic elements correctly without failing', () => {
  render(<App />);
  const searchButtonElement = screen.getByTestId(/search-button/i)
  expect(searchButtonElement).toBeInTheDocument();
});
