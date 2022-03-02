import React, { useState } from 'react';
import Card from '../Components/Card';
import zeldaTrailer from '../media/zelda-trailer.mov';
import triforcePng from '../media/zelda-botw-logo.png';

export default function InitialPage() {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const url = 'https://botw-compendium.herokuapp.com/api/v2';
    const result = await fetch(url).then((data) => data.json());

    setAllData({ ...result.data,
      all: [...result.data.creatures.food, ...result.data.creatures.non_food,
        ...result.data.equipment, ...result.data.materials,
        ...result.data.monsters, ...result.data.treasure] });
  };

  const handleClick = async () => {
    if (!allData.all) {
      await getData();
      setLoading(false);
    }
    setLoading(false);
  };

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
          <button
            type="button"
            className="saiba-mais-button"
            onClick={ handleClick }
          >
            Lets Search
          </button>
        </div>
      </div>
      <section id="content">
        {
          (!loading && (allData.all.map((data) => (
            <Card content={ data } key={ data.name } />))))
        }
      </section>
    </main>
  );
}
