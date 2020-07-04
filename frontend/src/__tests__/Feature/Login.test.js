import React from 'react';
import axios from 'axios';
import { render, fireEvent, screen } from '@testing-library/react';

import Login from '../../pages/Login';


// const server = setupServer(
//     rest.post('/login', (req, res, ctx) => {
//       return res(ctx.json({ token: 'fake_user_token' }))
//     }),
// )
  
// beforeAll(() => server.listen())
// afterEach(() => {
//     server.resetHandlers()
//     window.localStorage.removeItem('token')
// })
// afterAll(() => server.close())

test('allows the user to login successfully', async () => {
    // const login = [
    //     { name: 'chuck', token: 'norris' },
    // ];

    // axios.get.mockImplementationOnce(() =>
    //     Promise.resolve({ data: { hits: login } })
    // );

    // render(<Login />)

    // screen.debug();
    // screen.getByRole('button');


    // await userEvent.click(screen.getBf

    
    // render(<Login />)

    // const onSubmit = jest.fn();
  
    // fireEvent.click(screen.getByRole('button'));

    // expect(onSubmit).toHaveBeenCalledTimes(1);





    // fireEvent.change(screen.getByLabelText(/email/i), {
    //     target: { value: 'chuck' },
    // })
    // fireEvent.change(screen.getByLabelText(/password/i), {
    //     target: { value: 'norris' },
    // })
  
    // fireEvent.click(screen.getByText(/submit/i))
  
    // const alert = await screen.findByRole('alert')
  
    // expect(alert).toHaveTextContent(/congrats/i)
    // expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token)
});

// test('handles server exceptions', async () => {
//     server.use(
//         rest.post('/', (req, res, ctx) => {
//             return res(ctx.status(500), ctx.json({message: 'Internal server error'}))
//         }),
//     )
  
//     render(<Login />)
  
//     fireEvent.change(screen.getByLabelText(/email/i), {
//         target: { value: 'chuck' },
//     })
//     fireEvent.change(screen.getByLabelText(/password/i), {
//         target: { value: 'norris' },
//     })
  
//     fireEvent.click(screen.getByText(/submit/i))
  
//     const alert = await screen.findByRole('alert')
  
//     expect(alert).toHaveTextContent(/internal server error/i)
//     expect(window.localStorage.getItem('token')).toBeNull()
// });
