import { render, screen } from '@testing-library/react';
import DashBoard from './DashBoard';


test('renders title', () => {
  render(<DashBoard />);
  const titleElement = screen.getByText(/Atila Scholarship Helper/i);
  expect(titleElement).toBeInTheDocument();
});
