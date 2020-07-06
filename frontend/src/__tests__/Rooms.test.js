import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Rooms from '../pages/Rooms';
import api from "../services/api";

const apiMock = new MockAdapter(api);

describe('Testing The Rooms Page', () => {
  jest.spyOn(window, 'alert').mockReturnValue();
  
  it("should be valid when loading page success", async () => {
    render(<Rooms />)

    await act(async () => {
      apiMock
        .onGet("rooms")
        .reply(200, [
          { 
            id: "123", 
            nrRoom: "9999" 
          }
        ]);
    });
  });

  it("should be valid when has less information", async () => {
    const { getByTestId } = render(<Rooms />)
    
    await act(async () => {
      fireEvent.click(getByTestId("btnSalveRoom"));
    });
  });

  it("should be valid when has creation success", async () => { 
    const { getByTestId } = render(<Rooms />);

    await act(async () => {
      apiMock.onPost("rooms").reply(201, { 
          id: "124",
          nrRoom: "9999",
      });
    });

    await act(async () => {
      fireEvent.change(getByTestId("nrRoom"), {
        target: { value: "9999" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveRoom"));
    });
  });

  it("should be valid when has room already existed", async () => { 
    const { getByTestId } = render(<Rooms />);

    await act(async () => {
      apiMock.onPost("rooms").reply(226);
    });

    await act(async () => {
      fireEvent.change(getByTestId("nrRoom"), {
        target: { value: "9999" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveRoom"));
    });
  });

  it("should be valid when has try create fail", async () => { 
    const { getByTestId } = render(<Rooms />);

    await act(async () => {
      apiMock.onPost("rooms").reply(500);
    });

    await act(async () => {
      fireEvent.change(getByTestId("nrRoom"), {
        target: { value: "9999" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSalveRoom"));
    });
  });

  it("should be valid when has delete success", async () => {
    const { getByTestId } = render(<Rooms />);

    await act(async () => {
      apiMock.onGet("rooms").reply(200, [
        { 
          id: "123",
          nrRoom: "9999",
        }
      ]);

      apiMock.onDelete("rooms/123").reply(204);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnDeleteRoom"));
    });
  });

  it("should be valid when has delete fail", async () => {
    const { getByTestId } = render(<Rooms />);

    await act(async () => {
      apiMock.onGet("rooms").reply(200, [
        { 
          id: "123",
          nrRoom: "9999",
        }
      ]);

      apiMock.onDelete("rooms/123").reply(500);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnDeleteRoom"));
    });
  });
});
