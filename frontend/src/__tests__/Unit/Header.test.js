import React from 'react';
import { render } from '@testing-library/react';

import Header from '../../components/Header';

describe(`Header DOM's`, () => {
  // it("should be able to get Image Logo", () => {
  //   const { getByTestId } = render(<Header />);
  //   const domImageLogo = getByTestId("imageLogo");
  //   expect(domImageLogo).toBeInTheDocument();
  // });

  it("should be able to get Link Dashboard", () => {
    const { 
      getByText,
      getByTitle,
      getByTestId,
    } = render(<Header />);
    const domLinkButton = getByTitle(/Dashboard/i);
    expect(domLinkButton).toBeInTheDocument();  
  });

  // it("should be able to get Input Room", () => {
  //   const { getByTestId } = render(<Header />);
  //   const domFormInput = getByTestId("room");
  //   expect(domFormInput).toBeInTheDocument();  
  // });

  // it("should be able to get Input CheckIn", () => {
  //   const { getByTestId } = render(<Header />);
  //   const domFormInput = getByTestId("checkIn");
  //   expect(domFormInput).toBeInTheDocument();  
  // });

  // it("should be able to get Button Reset Concierge", () => {
  //   const { getByTestId } = render(<Header />);
  //   const domFormButton = getByTestId("btnResetConcierge");
  //   expect(domFormButton).toBeInTheDocument();
  // });

  // it("should be able to get Button Search Concierge", () => {
  //   const { getByTestId } = render(<Header />);
  //   const domFormButton = getByTestId("btnSearchConcierge");
  //   expect(domFormButton).toBeInTheDocument();
  // });

  // it("should be able to get Content Concierges", () => {
  //   const { getByTestId } = render(<Header />);
  //   const domContentConcierges = getByTestId("contentConcierges");
  //   expect(domContentConcierges).toBeInTheDocument();
  // });
});
