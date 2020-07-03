import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from "history";
import { MemoryRouter } from 'react-router';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { mount } from 'enzyme';

import App from '../../App';

const history = createMemoryHistory();

test("shoul be true when find component Header", () => {
    const { container } = render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    expect(container.innerHTML).toMatch('Header');
});
