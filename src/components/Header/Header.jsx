import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>CV Builder</h1>
        <p className="header-subtitle">Create your professional resume in minutes</p>
      </div>
      <div className="header-instructions">
        <p>Fill in your details on the left, see live preview on the right</p>
      </div>
    </header>
  );
};

export default Header;
