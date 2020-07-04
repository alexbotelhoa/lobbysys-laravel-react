import React from 'react';
import { render } from '@testing-library/react';

import Visitors from '../../pages/Visitors';

describe(`Page Visitors DOM's`, () => {
  test("should be able to get Content Visitor", () => {
    const { getByTestId } = render(<Visitors />);
    const domContentVisitor = getByTestId("contentVisitor");
    expect(domContentVisitor).toBeInTheDocument();
  });

  test("should be able to get Input Name", () => {
    const { getByTestId } = render(<Visitors />);
    const domFormInput = getByTestId("name");
    expect(domFormInput).toBeInTheDocument();  
  });

  test("should be able to get Input CPF", () => {
    const { getByTestId } = render(<Visitors />);
    const domFormInput = getByTestId("cpf");
    expect(domFormInput).toBeInTheDocument();  
  });

  test("should be able to get Input Birth", () => {
    const { getByTestId } = render(<Visitors />);
    const domFormInput = getByTestId("birth");
    expect(domFormInput).toBeInTheDocument();  
  });

  test("should be able to get Input E-mail", () => {
    const { getByTestId } = render(<Visitors />);
    const domFormInput = getByTestId("email");
    expect(domFormInput).toBeInTheDocument();  
  });

  test("should be able to get Button New Visitor", () => {
    const { getByTestId } = render(<Visitors />);
    const domFormButton = getByTestId("btnSalveVisitor");
    expect(domFormButton).toBeInTheDocument();
  });

  test("should be able to get Content Visitors", () => {
    const { getByTestId } = render(<Visitors />);
    const domContentVisitors = getByTestId("contentVisitors");
    expect(domContentVisitors).toBeInTheDocument();
  });
});
