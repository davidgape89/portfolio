import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export default () => (
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
