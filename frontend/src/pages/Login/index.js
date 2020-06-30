import React, { useState } from 'react';
import Cookies from 'js-cookie';

import './styles.css';
import api from '../../services/api';

export default function Login({ history }) {
  const [mensage, setMensage] = useState(null);
  const [email, setEmail] = useState('alexbotelho1@hotmail.com');
  const [password, setPassword] = useState('12345678');

  function checkInput(e) {
    e.preventDefault();

    if (email === '') return setMensage('Informe o seu e-mail!');
    if (password === '') return setMensage('Informe sua senha!');

    handleSubmit();
  };

  async function handleSubmit() {
    const res = await api.post('login', { email, password });

    const { token } = res.data;

    Cookies.set('token', token, { expires: 1, path: '' });

    history.push('/dashboard');
  }

  return (
    <>
      <div className="containerLogin">
        <div className="content">
          <p><strong>Sistema de Controle de Portaria</strong></p>

          <form onSubmit={checkInput}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Seu e-mail de cadastro"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <label htmlFor="email">SENHA *</label>
            <input 
              id="password" 
              type="password" 
              placeholder="Informe sua senha"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <button className="btnLogin" type="submit">Entrar</button>
          </form>
          
        </div>

        { mensage && (
          <div className="validation-container">
            <strong className="mensageError">{mensage}</strong>
            <button type="button" onClick={() => setMensage(null)}>FECHAR</button>
          </div>
        ) }
      </div>
    </>
  )
}
