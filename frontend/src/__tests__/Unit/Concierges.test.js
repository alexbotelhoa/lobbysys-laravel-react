import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Concierges from '../../pages/Concierges';

describe(`Page Concierges DOM's`, () => {
  it("should be able to get Content Concierge", () => {
    const { getByTestId } = render(<Concierges />);
    const domContentConcierge = getByTestId("contentConcierge");
    expect(domContentConcierge).toBeInTheDocument();
  });

  it("should be able to get Input Visitor", () => {
    const { getByTestId } = render(<Concierges />);
    const domFormInput = getByTestId("visitor");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Input Room", () => {
    const { getByTestId } = render(<Concierges />);
    const domFormInput = getByTestId("room");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Input CheckIn", () => {
    const { getByTestId } = render(<Concierges />);
    const domFormInput = getByTestId("checkIn");
    expect(domFormInput).toBeInTheDocument();  
  });

  it("should be able to get Button Reset Concierge", () => {
    const { getByTestId } = render(<Concierges />);
    const domFormButton = getByTestId("btnResetConcierge");
    expect(domFormButton).toBeInTheDocument();
  });

  it("should be able to get Button Search Concierge", () => {
    const { getByTestId } = render(<Concierges />);
    const domFormButton = getByTestId("btnSearchConcierge");
    expect(domFormButton).toBeInTheDocument();
  });

  it("should be able to get Content Concierges", () => {
    const { getByTestId } = render(<Concierges />);
    const domContentConcierges = getByTestId("contentConcierges");
    expect(domContentConcierges).toBeInTheDocument();
  });
});
