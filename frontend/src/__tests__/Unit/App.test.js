import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../../App';

describe(`Page App Component's`, () => {
  test("shoul be true when find component App", () => {
      const { container } = render(<App />);
      expect(container.innerHTML).toMatch('Informe sua senha');
  });
});
