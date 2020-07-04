import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Login from '../../pages/Login';

describe(`Page Login DOM's`, () => {


  test("should be able when the function works checkInput", () => {
    const checkInput = jest.fn();

    const { getByText } = render(<Login />);

    expect(getByText('Entrar')).toBeTruthy();

    // fireEvent.click(getByText('Entrar'));
    
    // expect(checkInput).toHaveBeenCalledTimes(1);
  });


  // test("should be able when the function works handleSubmit", () => {
  //   const handleSubmit = jest.fn();

  //   const { getByText } = render(<Login />);

  //   expect(getByText('Entrar')).toBeTruthy();

  //   fireEvent.click(getByText('Entrar'));
    
  //   expect(handleSubmit).toHaveBeenCalledTimes(1);
  // });



  test("should be able to get Input Email", () => {
    const { getByTestId } = render(<Login />);
    const domFormInput = getByTestId("email");
    expect(domFormInput).toBeInTheDocument();  
  });

  // test("should be able to get Input Password", () => {
  //   const { getByTestId } = render(<Login />);
  //   const domFormInput = getByTestId("password");
  //   expect(domFormInput).toBeInTheDocument();  
  // });

  // test("should be able to get Button Login", () => {
  //   const { getByText } = render(<Login />);
  //   const domFormButton = getByText("Entrar");
  //   expect(domFormButton).toBeInTheDocument();
  // });
});
