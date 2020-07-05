import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Login from '../../pages/Login';
import api from "../../services/api";
const apiMock = new MockAdapter(api);

describe(`Page Login DOM's`, () => {
  test("should be able when form exist", async () => {
    const { getByText } = render(<Login />);

    await act(async () => {
      fireEvent.click(getByText("Entrar"));
    });
  });

  test("should be able when form exist", async () => {
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

  test("should be able when form exist", async () => {
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

  test("should be able when form exist", async () => {
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
