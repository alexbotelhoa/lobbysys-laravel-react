import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
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

    // jest.spyOn(window, 'alert').mockReturnValue();

    // await act(async () => {
    //   apiMock
    //     .onGet("concierges")
    //     .reply(200, [
    //       { 
    //         id: "123", 
    //         name: "Fulano de Tal",
    //         cpf: "999.999.999-99",
    //         nrRoom: "9999",
    //         checkIn: "2000-01-01 00:00:00",
    //         checkOut: "2000-01-02 00:00:00",
    //       }
    //     ]);
    // });

    await act(async () => {
      apiMock
      .onPost("concierges", {
        params: {
          visitor: "",
          room: "",
          checkIn: "2000-01-01",
        }
      })
      .reply(200, [
        { 
          id: "123", 
          name: "Fulano de Tal",
          cpf: "999.999.999-99",
          nrRoom: "9999",
          checkIn: "2000-01-01 00:00:00",
          checkOut: "2000-01-02 00:00:00",
        }
      ])
    });

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: '' }
      });
      
      fireEvent.change(getByTestId('room'), {
        target: { value: '' }
      });

      fireEvent.change(getByTestId('checkIn'), {
        target: { value: '2000-01-01' }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnSearchConcierge"));
    });




    // await act(async () => {
    //   apiMock
    //     .onGet("concierges")
    //     .reply(200, {
    //       data: [{ 
    //         id: "123", 
    //         name: "Fulano de Tal",
    //         cpf: "999.999.999-99",
    //         nrRoom: "9999",
    //         checkIn: "2000-01-01 00:00:00",
    //         checkOut: "2000-01-02 00:00:00",
    //       }]
    //     });
    // });





  });






















  // it("should be able to get Content Concierge", () => {
  //   const { getByTestId } = render(<Concierges />);
  //   const domContentConcierge = getByTestId("contentConcierge");
  //   expect(domContentConcierge).toBeInTheDocument();
  // });

  // it("should be able to get Input Visitor", () => {
  //   const { getByTestId } = render(<Concierges />);
  //   const domFormInput = getByTestId("visitor");
  //   expect(domFormInput).toBeInTheDocument();  
  // });

  // it("should be able to get Input Room", () => {
  //   const { getByTestId } = render(<Concierges />);
  //   const domFormInput = getByTestId("room");
  //   expect(domFormInput).toBeInTheDocument();  
  // });

  // it("should be able to get Input CheckIn", () => {
  //   const { getByTestId } = render(<Concierges />);
  //   const domFormInput = getByTestId("checkIn");
  //   expect(domFormInput).toBeInTheDocument();  
  // });

  // it("should be able to get Button Reset Concierge", () => {
  //   const { getByTestId } = render(<Concierges />);
  //   const domFormButton = getByTestId("btnResetConcierge");
  //   expect(domFormButton).toBeInTheDocument();
  // });

  // it("should be able to get Button Search Concierge", () => {
  //   const { getByTestId } = render(<Concierges />);
  //   const domFormButton = getByTestId("btnSearchConcierge");
  //   expect(domFormButton).toBeInTheDocument();
  // });

  // it("should be able to get Content Concierges", () => {
  //   const { getByTestId } = render(<Concierges />);
  //   const domContentConcierges = getByTestId("contentConcierges");
  //   expect(domContentConcierges).toBeInTheDocument();
  // });
});
