import React from 'react';
import { render } from '@testing-library/react';

import Routes from '../Routes';

describe(`Routes Component's`, () => {
  it("shoul be true when find component Routes", () => {
    const { container } = render(<Routes />);
    expect(container.innerHTML).toMatch('Sistema de Controle de Portaria');
  });
});
