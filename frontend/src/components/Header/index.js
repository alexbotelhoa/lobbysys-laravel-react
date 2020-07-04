import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaLinkedin, FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import Cookies from 'js-cookie';

import './styles.css';
import api from '../../services/api';
import logo from '../../assets/logo.png';

export default function Header({ selected }) {
  const history = useHistory();
  const cookie = Cookies.get('token');
  // if (!cookie) history.push('/');

  function handleLogout() {
    api.post('logout', '', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    });

    Cookies.remove('token');

    history.push('/');

    return true;
  }

  return (
    <header id="mainHeader">
      <div className="contentHeader">
        <span data-testid="imageLogo">
          <img src={logo} alt="LobbySys"/>
        </span>

        <div className="btnNavegacao">
          <Link className="button" to="/dashboard">
            <button className="btn"
              style={selected === 'dashboard' ? { background: "#dcdce6" } : {}}
            >Dashboard</button>
          </Link>
          <Link className="button" to="/users">
            <button className="btn"
            style={selected === 'users' ? { background: "#dcdce6" } : {}}
            >Usuários</button>
          </Link>
          <Link className="button" to="/visitors">
            <button className="btn"
            style={selected === 'visitors' ? { background: "#dcdce6" } : {}}
            >Visitantes</button>
          </Link>
          <Link className="button" to="/rooms">
            <button className="btn"
            style={selected === 'rooms' ? { background: "#dcdce6" } : {}}
            >Salas</button>
          </Link>
          <Link className="button" to="/concierges">
            <button className="btn"
            style={selected === 'concierges' ? { background: "#dcdce6" } : {}}
            >Portaria</button>
          </Link>
        </div>

        <span>
          <a href="https://www.linkedin.com/in/alex-botelho-almeida/">
            <FaLinkedin size="28" data-testid="linkLinkedIn" />
          </a>
          <a href="https://www.facebook.com/alexbotelhoa">
            <FaFacebookSquare size="28" data-testid="linkFacebook" />
          </a>
          <a href="https://www.instagram.com/alexbotelhoa">
            <FaInstagramSquare size="28" data-testid="linkInstagram" />
          </a>
          <a href="https://twitter.com/alexbotelhoa">
            <FaTwitterSquare size="28" data-testid="linkTwitter" />
          </a>
          <button className="logout" type="button" onClick={() => handleLogout()}>
            <FiLogOut size="28" data-testid="linkCheckOut" /> 
          </button>
        </span>
      </div>
    </header>
  )
}
