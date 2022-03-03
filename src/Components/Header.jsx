import React from 'react';
import logo from '../media/Triforce_Artwork.png';

function Header() {
  return (
    <nav id="nav-bar">
      <div>
        <a href="#hero" className="brand-logo">
          <img
            src={ logo }
            alt="triforce.png"
            id="triforce-img"
          />
        </a>
      </div>
      <div className="text-nav">
        <a href="#filter-buttons">
          <h2>Hyrule Compendium</h2>
        </a>
      </div>
    </nav>
  );
}

export default Header;
