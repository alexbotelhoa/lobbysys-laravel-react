import React from 'react';
import { render } from '@testing-library/react';

import Login from '../../pages/Login';

describe(`Page Login DOM's`, () => {
  it("should be able to get Input Email", () => {
    const { getByTestId } = render(<Login />);
    const domFormInput = getByTestId("email");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Input Password", () => {
    const { getByTestId } = render(<Login />);
    const domFormInput = getByTestId("password");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Button Login", () => {
    const { getByText } = render(<Login />);
    const domFormButton = getByText("Entrar");
    expect(domFormButton).toBeInTheDocument();
  });
});
