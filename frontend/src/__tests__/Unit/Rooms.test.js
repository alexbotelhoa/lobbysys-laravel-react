import React from 'react';
import { render } from '@testing-library/react';

import Rooms from '../../pages/Rooms';

describe(`Page Rooms DOM's`, () => {
  it("should be able to get Content Room", () => {
    const { getByTestId } = render(<Rooms />);
    const domContentRoom = getByTestId("contentRoom");
    expect(domContentRoom).toBeInTheDocument();
  });

  it("should be able to get Input Nr Room", () => {
    const { getByTestId } = render(<Rooms />);
    const domFormInput = getByTestId("nrRoom");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Button New Room", () => {
    const { getByTestId } = render(<Rooms />);
    const domFormButton = getByTestId("btnSalveRoom");
    expect(domFormButton).toBeInTheDocument();
  });

  it("should be able to get Content Rooms", () => {
    const { getByTestId } = render(<Rooms />);
    const domContentRooms = getByTestId("contentRooms");
    expect(domContentRooms).toBeInTheDocument();
  });
});
