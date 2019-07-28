import React from 'react';
import {Link} from 'react-router-dom';
import {connectAuth} from '../../contexts/auth/AuthContext';
import './Header.scss';

export const Header = () => (
  <header>
    <div className="header-content">
      <Link to="/">
        <h1>David&apos;s Dev thoughts</h1>
      </Link>
      <ul>
        <Link to="/about-me">
          About me
        </Link>
      </ul>
    </div>
  </header>
);

export default connectAuth(Header);
