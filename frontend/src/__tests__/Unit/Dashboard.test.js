import React from 'react';
import { render } from '@testing-library/react';

import Dashboard from '../../pages/Dashboard';

describe(`Page Dashboard DOM's`, () => {
  it("should be able to get Content Visitors", () => {
    const { getByTestId } = render(<Dashboard />);
    const domContentVisitors = getByTestId("contentVisitors");
    expect(domContentVisitors).toBeInTheDocument();
  });

  it("should be able to get Select Visitor", () => {
    const { getByTestId } = render(<Dashboard />);
    const domFormSelect = getByTestId("visitor");
    expect(domFormSelect).toBeInTheDocument();  
  });

  it("should be able to get Input Room", () => {
    const { getByTestId } = render(<Dashboard />);
    const domFormInput = getByTestId("room");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Button CkeckIn", () => {
    const { getByTitle } = render(<Dashboard />);
    const domFormButton = getByTitle("CkeckIn");
    expect(domFormButton).toBeInTheDocument();
  });

  it("should be able to get Content Rooms", () => {
    const { getByTestId } = render(<Dashboard />);
    const domContentRooms = getByTestId("contentRooms");
    expect(domContentRooms).toBeInTheDocument();
  });

  it("should be able to get Content Queue", () => {
    const { getByTestId } = render(<Dashboard />);
    const domContentQueue = getByTestId("contentQueue");
    expect(domContentQueue).toBeInTheDocument();
  });
});
