import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";

import Dashboard from '../../pages/Dashboard';
import api from "../../services/api";

const apiMock = new MockAdapter(api);

describe('Testing The Dashboard Page', () => {
  jest.spyOn(window, 'alert').mockReturnValue();

  it("should be valid when loading page success", async () => {
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






  it("should be valid when has less information", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });

    await act(async () => {
      fireEvent.change(getByTestId("visitor"), {
        target: { value: ["123", "Fulano de Tal"] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });




  it("should be valid when has creation success", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onPost("arrivals").reply(201, { 
          id: "124",
          name: "Fulano de Tal",
      });
    });

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: ["123", "Fulano de Tal"] }
      });

      fireEvent.change(getByTestId('room'), {
        target: { value: ["123", "9999"] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });




  it("should be valid when has visitor already existed", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onPost("arrivals").reply(226);
    });

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: ["123", "Fulano de Tal"] }
      });

      fireEvent.change(getByTestId('room'), {
        target: { value: ["123", "9999"] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });



  it("should be valid when has fail tring try create one visitor", async () => { 
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onPost("arrivals").reply(500);
    });

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: ["123", "Fulano de Tal"] }
      });

      fireEvent.change(getByTestId('room'), {
        target: { value: ["123", "9999"] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });





  it("should be valid when has visitor goes to queue", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onPost("arrivals").reply(203);

      apiMock.onPost("queues").reply(201, { 
        id: "124",
        name: "Fulano de Tal",
      });
    });

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: ["123", "Fulano de Tal"] }
      });

      fireEvent.change(getByTestId('room'), {
        target: { value: ["123", "9999"] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });





  it("should be valid when has position in the queue already existed", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onPost("arrivals").reply(203);

      apiMock.onPost("queues").reply(203);
    });

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: ["123", "Fulano de Tal"] }
      });

      fireEvent.change(getByTestId('room'), {
        target: { value: ["123", "9999"] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });




  it("should be valid when has fail tring try of create one position in the queue", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onPost("arrivals").reply(203);

      apiMock.onPost("queues").reply(500);
    });

    await act(async () => {
      fireEvent.change(getByTestId('visitor'), {
        target: { value: ["123", "Fulano de Tal"] }
      });

      fireEvent.change(getByTestId('room'), {
        target: { value: ["123", "9999"] }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCkeckIn"));
    });
  });












  it("should be valid when has delete success one visitor", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onGet("arrivals").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("arrivals/123").reply(204);
    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCheckOut"));
    });
  });

  it("should be valid when has delete success one visitor and goes authorization one new visitor", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onGet("arrivals").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("arrivals/123").reply(201);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCheckOut"));
    });
  });

  it("should be valid when has delete fail", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onGet("arrivals").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("arrivals/123").reply(500);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnCheckOut"));
    });
  });














  it("should be valid when has delete success one position in the queue", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onGet("queues").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("queues/123").reply(204);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnExitQueue"));
    });
  });

  it("should be valid when has delete fail", async () => {
    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      apiMock.onGet("queues").reply(200, [
        { 
          id: "123",
          name: "Fulano de Tal",
        }
      ]);

      apiMock.onDelete("queues/123").reply(500);

    });

    await act(async () => {
      fireEvent.click(getByTestId("btnExitQueue"));
    });
  });




});
