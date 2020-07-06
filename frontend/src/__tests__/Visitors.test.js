import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Visitors from '../pages/Visitors';
import api from "../services/api";

const apiMock = new MockAdapter(api);

describe('Testing The Visitors Page', () => {
  jest.spyOn(window, 'alert').mockReturnValue();

  it("should be valid when loading page success", async () => {
    render(<Visitors />)

    await act(async () => {
      apiMock
        .onGet("visitors")
        .reply(200, [
          { 
            id: "123", 
            name: "Fulano de Tal" 
          }
        ])
    });
  });

  it("should be valid when has less information", async () => {
    const { getByTestId } = render(<Visitors />);

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveVisitor"));
    });

    await act(async () => {
      fireEvent.change(getByTestId("name"), {
        target: { value: "Fulano de Tal" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveVisitor"));
    });
  });

  it("should be valid when has creation success", async () => { 
    const { getByTestId } = render(<Visitors />);

    await act(async () => {
      apiMock.onPost("visitors").reply(201, { 
          id: "124",
          name: "Fulano de Tal",
      });
    });

    await act(async () => {
      fireEvent.change(getByTestId("name"), {
        target: { value: "Fulano de Tal" }
      });

      fireEvent.change(getByTestId("cpf"), {
        target: { value: "999.999.999-99" }
      });

      fireEvent.change(getByTestId("birth"), {
        target: { value: "2000-01-01" }
      });

      fireEvent.change(getByTestId("email"), {
        target: { value: "teste@teste.com" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveVisitor"));
    });
  });

  it("should be valid when has visitor already existed", async () => { 
    const { getByTestId } = render(<Visitors />);

    await act(async () => {
      apiMock.onPost("visitors").reply(226);
    });

    await act(async () => {
      fireEvent.change(getByTestId("name"), {
        target: { value: "Fulano de Tal" }
      });
      
      fireEvent.change(getByTestId("cpf"), {
        target: { value: "999.999.999-99" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveVisitor"));
    });
  });

  it("should be valid when has fail tring try create", async () => { 
    const { getByTestId } = render(<Visitors />);

    await act(async () => {
      apiMock.onPost("visitors").reply(500);
    });

    await act(async () => {
      fireEvent.change(getByTestId("name"), {
        target: { value: "Fulano de Tal" }
      });

      fireEvent.change(getByTestId("cpf"), {
        target: { value: "999.999.999-99" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveVisitor"));
    });
  });

  it("should be valid when has delete success", async () => {
    const { getByTestId } = render(<Visitors />);

    await act(async () => {
      apiMock.onGet("visitors").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("visitors/123").reply(204);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnDeleteVisitor"));
    });
  });

  it("should be valid when has delete fail", async () => {
    const { getByTestId } = render(<Visitors />);

    await act(async () => {
      apiMock.onGet("visitors").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("visitors/123").reply(500);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnDeleteVisitor"));
    });
  });
});
