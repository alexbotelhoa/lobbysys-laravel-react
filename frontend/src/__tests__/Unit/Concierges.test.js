import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Concierges from '../../pages/Concierges';
import api from "../../services/api";

const apiMock = new MockAdapter(api);

describe('Testing The Concierge Page', () => {
  jest.spyOn(window, 'alert').mockReturnValue();
  
  it("should be valid when loading page success", async () => {
    render(<Concierges />)

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
        ]);
    });
  });

  it("should be valid when has less information", async () => {
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

  it("should be valid when has search found", async () => {
    const { getByTestId } = render(<Concierges />);

    await act(async () => {
      apiMock
        .onGet("concierges?visitor=&room=&checkIn=2000-01-01")
        .reply(200, [
          {
            id: "123"
          }
        ]);
    });

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: "" }
      });
      
      fireEvent.change(getByTestId('room'), {
        target: { value: "" }
      });

      fireEvent.change(getByTestId('checkIn'), {
        target: { value: "2000-01-01" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSearchConcierge"));
    });
  });

  it("should be valid when has search not found", async () => {
    const { getByTestId } = render(<Concierges />);

    await act(async () => {
      apiMock
        .onGet("concierges?visitor=&room=&checkIn=2000-01-01")
        .reply(200, []);
    });

    await act(async () => {
      fireEvent.change(getByTestId('checkIn'), {
        target: { value: "2000-01-01" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSearchConcierge"));
    });
  });

  it("should be valid when has search fail", async () => {
    const { getByTestId } = render(<Concierges />);

    await act(async () => {
      apiMock
        .onGet("concierges?visitor=&room=&checkIn=2000-01-01")
        .reply(500);
    });

    await act(async () => {
      fireEvent.change(getByTestId('checkIn'), {
        target: { value: "2000-01-01" }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSearchConcierge"));
    });
  });
});
