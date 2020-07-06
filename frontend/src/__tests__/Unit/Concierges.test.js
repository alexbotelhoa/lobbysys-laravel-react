import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Concierges from '../../pages/Concierges';
import api from "../../services/api";

const apiMock = new MockAdapter(api);

describe('Testing The Concierge Page', () => {

  it("should be valid when loading select success", async () => {
    render(<Concierges />)

    await act(async () => {
      apiMock
        .onGet("visitors")
        .reply(200, [
          { 
            id: "666", 
            name: "Fulano de Tal" 
          }
        ])
        .onGet("rooms")
        .reply(200, [
          { 
            id: "555", 
            nrRoom: "9999" 
          }
        ]);
    });
  });

  it("should be valid when has no information", async () => {
    const { getByTestId } = render(<Concierges />);

    await act(async () => {
      fireEvent.click(getByTestId("btnSearchConcierge"));
    });
  });

  it("should be valid when clear the information", async () => {
    const { getByTestId } = render(<Concierges />);

    await act(async () => {
      fireEvent.click(getByTestId("btnResetConcierge"));
    });
  });

  it("should be valid when has ...", async () => {
    const { getByTestId } = render(<Concierges />);

    jest.spyOn(window, 'alert').mockReturnValue();

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: 0 }
      });
      
      fireEvent.change(getByTestId('room'), {
        target: { value: 0 }
      });

      fireEvent.change(getByTestId('checkIn'), {
        target: { value: "9999-12-30" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSearchConcierge"));
    });
  });
});
