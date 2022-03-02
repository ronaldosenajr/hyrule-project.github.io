import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import zeldaTrailer from '../media/zelda-trailer.mov';
import zeldaLogo from '../media/zelda-botw-logo.png';
import triforcePng from '../media/Triforce_Artwork.png';

export default function InitialPage() {
  const [allData, setAllData] = useState({});
  const [filterValue, setFilterValue] = useState('all');
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canShowCards, setCanShowCards] = useState(false);

  const getData = async () => {
    const url = 'https://botw-compendium.herokuapp.com/api/v2';
    const result = await fetch(url).then((data) => data.json());

    setAllData({ ...result.data,
      creatures: [...result.data.creatures.non_food],
      food: [...result.data.creatures.food],
      all: [...result.data.creatures.food, ...result.data.creatures.non_food,
        ...result.data.equipment, ...result.data.materials,
        ...result.data.monsters, ...result.data.treasure] });
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      setDataToDisplay([...allData[filterValue]]);
    }
  }, [loading, filterValue, allData]);

  const handleClick = async () => {
    if (!allData.all) {
      setFilterValue('all');
      await getData();
    }
    setCanShowCards(true);
  };

  const setFilterDisplay = (name) => {
    if (!allData.all) {
      getData();
    }
    setFilterValue(name);
    setCanShowCards(true);
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
            src={ zeldaLogo }
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
      <section id="filter-buttons">
        <h2>Filter</h2>
        <div id="nav-buttons">
          <a
            href="#content"
            className="nav-btn"
            onClick={ () => setFilterDisplay('all') }
          >
            <div id="all-btn">All</div>
          </a>
          <a
            href="#content"
            className="nav-btn"
            onClick={ () => setFilterDisplay('creatures') }
          >
            <div id="creatures-btn">Creatures</div>
          </a>
          <a
            href="#content"
            className="nav-btn"
            onClick={ () => setFilterDisplay('equipment') }
          >
            <div id="items-btn">Equipment</div>
          </a>
          <a
            href="#content"
            className="nav-btn"
            onClick={ () => setFilterDisplay('food') }
          >
            <div id="food-btn">Food</div>
          </a>
          <a
            href="#content"
            className="nav-btn"
            onClick={ () => setFilterDisplay('materials') }
          >
            <div id="materials-btn">Materials</div>
          </a>
          <a
            href="#content"
            className="nav-btn"
            onClick={ () => setFilterDisplay('monsters') }
          >
            <div id="monsters-btn">Monsters</div>
          </a>
          <a
            href="#content"
            className="nav-btn"
            onClick={ () => setFilterDisplay('treasure') }
          >
            <div id="treasure-btn">Treasure</div>
          </a>
        </div>
      </section>
      <section id="content">
        {
          (canShowCards && (dataToDisplay.map((data) => (
            <Card content={ data } key={ data.name } />))))
        }
        {
          (canShowCards && loading
        && (
          <div className="loader-section">
            <img className="loader" src={ triforcePng } alt="zelda triforce" />
            <h3>Loading...</h3>
          </div>))
        }
      </section>
    </main>
  );
}
