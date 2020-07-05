import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Dashboard from '../../pages/Dashboard';
import api from "../../services/api";

const apiMock = new MockAdapter(api);

describe('Testing The Dashboard Page', () => {
  it("should be valid when ...", async () => {
    render(<Dashboard />)

    await act(async () => {
      apiMock
        .onGet("visitors")
        .reply(200, [
          { 
            id: "123", 
            name: "Fulano de Tal" 
          }
        ])
        .onGet("rooms")
        .reply(200, [
          { 
            id: "123", 
            nrRoom: "9999" 
          }
        ])
        .onGet("arrivals")
        .reply(200, [
          { 
            id: "123", 
            nrRoom: "9999", 
            name: "Fulano de Tal",
            checkIn: "01/01/2001"
          }
        ])
        .onGet("queues")
        .reply(200, [
          {
            id: "123", 
            nrRoom: "9999", 
            name: "Fulano de Tal",
            created_at: "01/01/2001"
          }
        ]);
    });
  });






  it("should be valid when has no information", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });

  it("should be valid when has the visitor", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: ['123', 'Fulano de Tal'] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });

  it("should be valid when has the visitor and the room", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: ['123', 'Fulano de Tal'] }
      });
      
      fireEvent.change(getByTestId('room'), {
        target: { value: ['123', '9999'] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });

    // screen.debug()
  });



});
