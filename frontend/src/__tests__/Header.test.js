import React from 'react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, screen, act } from '@testing-library/react';
import MockAdapter from "axios-mock-adapter";
import api from "../services/api";

const apiMock = new MockAdapter(api);

import Header from '../components/Header';

describe('Testing The Header', () => {
  it("should be valid when it is possible logout", async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    await act(async () => {
      apiMock.onPost("logout").reply(200, {
        headers: {
          Authorization: `Bearer 123`
        }
      });
    });

    await act(async () => {
      fireEvent.click(getByTestId("linkCheckOut"));
    });
  });
});
