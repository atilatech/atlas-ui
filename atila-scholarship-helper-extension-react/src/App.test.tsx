import { render } from '@testing-library/react';
import App from './App';

test('renders succesfully', () => {
  const component = render(<App />);
  expect(component.container).toBeTruthy();
});
