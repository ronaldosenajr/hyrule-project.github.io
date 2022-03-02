import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import zeldaTrailer from '../media/zelda-trailer.mov';
import triforcePng from '../media/zelda-botw-logo.png';

export default function InitialPage() {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const url = 'https://botw-compendium.herokuapp.com/api/v2';
    const result = await fetch(url).then((data) => data.json());
    setAllData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <div id="hero">
        <video
          className="video-banner"
          width="100%"
          src={ zeldaTrailer }
          autoPlay
          muted
          loop
        />
        <div className="logo-banner">
          <img
            className="logotipo-zelda"
            src={ triforcePng }
            alt="logo-zelda"
          />
          <button type="button" className="saiba-mais-button">Lets Search</button>
        </div>
      </div>
      <div id="content">
        {
          (!loading && (allData.creatures.food.map((data) => (
            <Card content={ data } key={ data.name } />))))
        }
      </div>
    </main>
  );
}
