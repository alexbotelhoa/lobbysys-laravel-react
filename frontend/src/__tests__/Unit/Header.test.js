import React from 'react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";

const apiMock = new MockAdapter(api);

import Header from '../../components/Header';

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe(`Header DOM's`, () => {
  test("should be able to get Image Logo", () => {   
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    expect(getByTestId("imageLogo")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a link called Dashboard", () => { 
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    );  

    expect(getByText("Dashboard")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a link called Usuários", () => { 
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    ); 

    expect(getByText("Usuários")).toBeInTheDocument();
  });
  
  test("shoulb be true when it exists a link called Visitantes", () => { 
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    ); 

    expect(getByText("Visitantes")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a link called Salas", () => {   
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    ); 

    expect(getByText("Salas")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a link called Portaria", () => { 
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>
    ); 

    expect(getByText("Portaria")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a Icon called linkLinkedIn", () => { 
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    expect(getByTestId("linkLinkedIn")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a Icon called linkFacebook", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    expect(getByTestId("linkFacebook")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a Icon called linkInstagram", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    expect(getByTestId("linkInstagram")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a Icon called linkTwitter", () => { 
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    expect(getByTestId("linkTwitter")).toBeInTheDocument();
  });

  test("shoulb be true when it exists a Button called linkCheckOut", () => {  
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    expect(getByTestId("linkCheckOut")).toBeInTheDocument();
  });
});
