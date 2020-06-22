import React from 'react';
import { RiBuilding3Line } from 'react-icons/ri';
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

import './styles.css';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <span>
          <RiBuilding3Line size="32" className="imageLogo" />
          <img src={logo} alt="LobbySys"/>
        </span>
        <span>
          <FaFacebookSquare size="28" />&nbsp;
          <FaInstagramSquare size="28" />&nbsp;
          <FaTwitterSquare size="28" /> 
        </span>
      </div>
    </header>
  )
}