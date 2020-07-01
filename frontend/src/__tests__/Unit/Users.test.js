import React from 'react';
import { render } from '@testing-library/react';

import Users from '../../pages/Users';

describe(`Page Users DOM's`, () => {
  it("should be able to get Content User", () => {
    const { getByTestId } = render(<Users />);
    const domContentUser = getByTestId("contentUser");
    expect(domContentUser).toBeInTheDocument();
  });

  it("should be able to get Input Name", () => {
    const { getByTestId } = render(<Users />);
    const domFormInput = getByTestId("name");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Input Email", () => {
    const { getByTestId } = render(<Users />);
    const domFormInput = getByTestId("email");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Input Password", () => {
    const { getByTestId } = render(<Users />);
    const domFormInput = getByTestId("password");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Input Password Confirm", () => {
    const { getByTestId } = render(<Users />);
    const domFormInput = getByTestId("passwordConfirm");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Button New User", () => {
    const { getByTestId } = render(<Users />);
    const domFormButton = getByTestId("btnSalveUser");
    expect(domFormButton).toBeInTheDocument();
  });

  it("should be able to get Content Users", () => {
    const { getByTestId } = render(<Users />);
    const domContentUsers = getByTestId("contentUsers");
    expect(domContentUsers).toBeInTheDocument();
  });
});
