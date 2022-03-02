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
        <h2>Hyrule Compendium</h2>
      </div>
    </nav>
  );
}

export default Header;
