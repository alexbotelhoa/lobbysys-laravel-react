import React from 'react';
import { render } from '@testing-library/react';

import Dashboard from '../../pages/Dashboard/index';

// describe(`Page Dashboard DOM's`, () => {
  test("should be able to get Select Visitor", () => {
    const { getByText, getByTestId } = render(<Dashboard />)
    const domFormSelect = getByTestId("visitor");

    expect(domFormSelect).toBeInTheDocument();
  });









  // test("should be able to get Content Visitors", () => {
  //   const { getByTestId } = render(<Dashboard />);
  //   const domContentVisitors = getByTestId("contentVisitors");
  //   expect(domContentVisitors).toBeInTheDocument();
  // });

  // test("should be able to get Select Visitor", () => {
  //   const { getByTestId } = render(<Dashboard />);
  //   const domFormSelect = getByTestId("visitor");
  //   expect(domFormSelect).toBeInTheDocument();  
  // });

  // test("should be able to get Input Room", () => {
  //   const { getByTestId } = render(<Dashboard />);
  //   const domFormInput = getByTestId("room");
  //   expect(domFormInput).toBeInTheDocument();  
  // });

  // test("should be able to get Button CkeckIn", () => {
  //   const { getByTitle } = render(<Dashboard />);
  //   const domFormButton = getByTitle("CkeckIn");
  //   expect(domFormButton).toBeInTheDocument();
  // });

  // test("should be able to get Content Rooms", () => {
  //   const { getByTestId } = render(<Dashboard />);
  //   const domContentRooms = getByTestId("contentRooms");
  //   expect(domContentRooms).toBeInTheDocument();
  // });

  // test("should be able to get Content Queue", () => {
  //   const { getByTestId } = render(<Dashboard />);
  //   const domContentQueue = getByTestId("contentQueue");
  //   expect(domContentQueue).toBeInTheDocument();
  // });
// });
