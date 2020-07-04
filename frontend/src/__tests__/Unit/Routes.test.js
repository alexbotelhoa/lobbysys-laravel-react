import React from 'react';
// import { Router } from "react-router-dom";
// import { createMemoryHistory } from "history";
import { render } from '@testing-library/react';

import Routes from '../../Routes';

describe(`Routes Component's`, () => {
  test("shoul be true when find component Routes", () => {
    const { container } = render(<Routes />);
    expect(container.innerHTML).toMatch('Sistema de Controle de Portaria');
  });

  // test("shoul be true when not find route Login", () => {
  //   const history = createMemoryHistory();
  //   history.push('/');
  //   render(
  //     <Router history={history}>
  //       <Routes />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe("/");
  // });

  // test("shoul be true when not find route Dashboard", () => {
  //   const history = createMemoryHistory();
  //   history.push('/dashboard');
  //   render(
  //     <Router history={history}>
  //       <Routes />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe("/dashboard");
  // });

  // test("shoul be true when not find route Users", () => {
  //   const history = createMemoryHistory();
  //   history.push('/users');
  //   render(
  //     <Router history={history}>
  //       <Routes />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe("/users");
  // });

  // test("shoul be true when not find route Visitors", () => {
  //   const history = createMemoryHistory();
  //   history.push('/visitors');
  //   render(
  //     <Router history={history}>
  //       <Routes />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe("/visitors");
  // });

  // test("shoul be true when not find route Rooms", () => {
  //   const history = createMemoryHistory();
  //   history.push('/rooms');
  //   render(
  //     <Router history={history}>
  //       <Routes />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe("/rooms");
  // });

  // test("shoul be true when not find route Concierges", () => {
  //   const history = createMemoryHistory();
  //   history.push('/concierges');
  //   render(
  //     <Router history={history}>
  //       <Routes />
  //     </Router>
  //   );
  //   expect(history.location.pathname).toBe("/concierges");
  // });
});
