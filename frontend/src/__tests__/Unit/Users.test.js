import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Users from '../../pages/Users';
import api from "../../services/api";

const apiMock = new MockAdapter(api);

describe('Testing The Users Page', () => {
  jest.spyOn(window, 'alert').mockReturnValue();

  it("should be valid when loading page success", async () => {
    render(<Users />)

    await act(async () => {
      apiMock
        .onGet("users")
        .reply(200, [
          { 
            id: "123", 
            name: "Fulano de Tal" 
          }
        ])
    });
  });

  it("should be valid when has less information", async () => {
    const { getByTestId } = render(<Users />);

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveUser"));
    });

    await act(async () => {
      fireEvent.change(getByTestId("name"), {
        target: { value: "Fulano de Tal" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveUser"));
    });

    await act(async () => {
      fireEvent.change(getByTestId("email"), {
        target: { value: "teste@teste.com" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveUser"));
    });

    await act(async () => {
      fireEvent.change(getByTestId("password"), {
        target: { value: "12345678" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveUser"));
    });

    await act(async () => {
      fireEvent.change(getByTestId("passwordConfirm"), {
        target: { value: "123456789" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveUser"));
    });
  });

  it("should be valid when has creation success", async () => { 
    const { getByTestId } = render(<Users />);

    await act(async () => {
      apiMock.onPost("users").reply(201, { 
          id: "124",
          name: "Fulano de Tal",
      });
    });

    await act(async () => {
      fireEvent.change(getByTestId("name"), {
        target: { value: "Fulano de Tal" }
      });

      fireEvent.change(getByTestId("email"), {
        target: { value: "teste@teste.com" }
      });

      fireEvent.change(getByTestId("password"), {
        target: { value: "12345678" }
      });

      fireEvent.change(getByTestId("passwordConfirm"), {
        target: { value: "12345678" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveUser"));
    });
  });

  it("should be valid when has user already existed", async () => { 
    const { getByTestId } = render(<Users />);

    await act(async () => {
      apiMock.onPost("users").reply(226);
    });

    await act(async () => {
      fireEvent.change(getByTestId("name"), {
        target: { value: "Fulano de Tal" }
      });

      fireEvent.change(getByTestId("email"), {
        target: { value: "teste@teste.com" }
      });

      fireEvent.change(getByTestId("password"), {
        target: { value: "12345678" }
      });

      fireEvent.change(getByTestId("passwordConfirm"), {
        target: { value: "12345678" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveUser"));
    });
  });

  it("should be valid when has fail tring try create", async () => { 
    const { getByTestId } = render(<Users />);

    await act(async () => {
      apiMock.onPost("users").reply(500);
    });

    await act(async () => {
      fireEvent.change(getByTestId("name"), {
        target: { value: "Fulano de Tal" }
      });

      fireEvent.change(getByTestId("email"), {
        target: { value: "teste@teste.com" }
      });

      fireEvent.change(getByTestId("password"), {
        target: { value: "12345678" }
      });

      fireEvent.change(getByTestId("passwordConfirm"), {
        target: { value: "12345678" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveUser"));
    });
  });

  it("should be valid when has delete success", async () => {
    const { getByTestId } = render(<Users />);

    await act(async () => {
      apiMock.onGet("users").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("users/123").reply(204);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnDeleteUser"));
    });
  });

  it("should be valid when has delete fail", async () => {
    const { getByTestId } = render(<Users />);

    await act(async () => {
      apiMock.onGet("users").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("users/123").reply(500);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnDeleteUser"));
    });
  });
});
