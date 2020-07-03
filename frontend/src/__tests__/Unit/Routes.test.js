import React from 'react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Header from '../../components/Header';
import Routes from '../../Routes';

// test("shoul be true when find component Header", () => {
//     const history = createMemoryHistory();
//     const { container } = render(
//         <Router history={history}>
//           <Routes />
//         </Router>
//     );
//     expect(container.innerHTML).toMatch('Header');
// });

test("shoul be true when not find route Not Found", () => {
    const history = createMemoryHistory();
    const { container, getByText, getByTestId } = render(
        <Router history={history}>
          <Routes />
        </Router>
    );

    expect(container.innerHTML).toMatch("Informe sua senha");

    fireEvent.click(getByText("Dashboard"));

    expect(container.innerHTML).toMatch("contentVisitors");

    fireEvent.click(getByText("Usuários"));

    expect(container.innerHTML).toMatch("contentUser");

});







// test("shoul be true when not find route Login", () => {
//     history.push('/');
//     render(
//       <Router history={history}>
//         <Routes />
//       </Router>
//     );
//     expect(history.location.pathname).toBe("/");
// });

// test("shoul be true when not find route Dashboard", () => {
//     history.push('/dashboard');
//     render(
//       <Router history={history}>
//         <Routes />
//       </Router>
//     );
//     expect(history.location.pathname).toBe("/dashboard");
// });

// test("shoul be true when not find route Users", () => {
//     history.push('/users');
//     render(
//       <Router history={history}>
//         <Routes />
//       </Router>
//     );
//     expect(history.location.pathname).toBe("/users");
// });

// test("shoul be true when not find route Visitors", () => {
//     history.push('/visitors');
//     render(
//       <Router history={history}>
//         <Routes />
//       </Router>
//     );
//     expect(history.location.pathname).toBe("/visitors");
// });

// test("shoul be true when not find route Rooms", () => {
//     history.push('/rooms');
//     render(
//       <Router history={history}>
//         <Routes />
//       </Router>
//     );
//     expect(history.location.pathname).toBe("/rooms");
// });

// test("shoul be true when not find route Concierges", () => {
//     history.push('/concierges');
//     render(
//       <Router history={history}>
//         <Routes />
//       </Router>
//     );
//     expect(history.location.pathname).toBe("/concierges");
// });
