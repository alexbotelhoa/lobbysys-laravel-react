import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Login from '../../pages/Login';
import api from "../../services/api";
const apiMock = new MockAdapter(api);

describe('Testing The Login Page', () => {
  it("should be valid when has no information", async () => {
    const { getByText } = render(<Login />);

    await act(async () => {
      fireEvent.click(getByText("Entrar"));
    });
  });

  it("should be valid when has the email", async () => {
    const { getByText, getByTestId } = render(<Login />);

    await act(async () => {
      fireEvent.change(getByTestId('email'), {
        target: { value: 'teste@lobbysys.com' }
      });
    });

    await act(async () => {
      fireEvent.click(getByText("Entrar"));
    });
  });

  it("should be valid when has the email and the password", async () => {
    const { getByText, getByTestId } = render(<Login />);

    await act(async () => {
      fireEvent.change(getByTestId('email'), {
        target: { value: 'teste@lobbysys.com' }
      });
      
      fireEvent.change(getByTestId('password'), {
        target: { value: '123' }
      });
    });

    await act(async () => {
      fireEvent.click(getByText("Entrar"));
    });
  });

  it("should be valid when login is valid  ", async () => {
    const { getByText, getByTestId } = render(<Login />);

    await act(async () => {
      apiMock.onPost("login").reply(200, {
        name: "Admin",
        token: "123",
      });


      fireEvent.change(getByTestId('email'), {
        target: { value: 'admin@lobbysys.com' }
      });
      
      fireEvent.change(getByTestId('password'), {
        target: { value: '12345678' }
      });
    });

    await act(async () => {
      fireEvent.click(getByText("Entrar"));
    });
  });
});
