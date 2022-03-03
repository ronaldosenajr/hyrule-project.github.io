import React, { useState, useEffect, useRef } from 'react';
import Card from '../Components/Card';
import zeldaTrailer from '../media/zelda-trailer.mov';
import zeldaLogo from '../media/zelda-botw-logo.png';
import triforcePng from '../media/Triforce_Artwork.png';
import EvidencedCard from '../Components/EvidencedCard';
import Footer from '../Components/Footer';

export default function InitialPage() {
  const [allData, setAllData] = useState({});
  const [filterValue, setFilterValue] = useState('all');
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canShowCards, setCanShowCards] = useState(false);
  const [cardSelected, setCardSelected] = useState(false);

  const myRef = useRef(null);

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
    if (!loading && !cardSelected) {
      setDataToDisplay([...allData[filterValue]]);
    }
  }, [loading, filterValue, allData, cardSelected]);

  const handleClick = async () => {
    if (!allData.all) {
      getData();
    }
    setCanShowCards(true);
    setCardSelected(false);
    setFilterValue('all');
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onCardClicked = (id) => {
    setCardSelected(!cardSelected);
    setCanShowCards(!canShowCards);
    const cardValue = allData.all.find((value) => value.id === id);
    setDataToDisplay([cardValue]);
    if (cardSelected && !canShowCards) {
      setDataToDisplay([...allData[filterValue]]);
      console.log('chamou dentro do if');
    }
  };

  const setFilterDisplay = (name) => {
    if (!allData.all) {
      getData();
    }
    setCanShowCards(true);
    setCardSelected(false);
    setFilterValue(name);
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <h2>Filters</h2>
        <div id="nav-buttons">
          <button
            type="button"
            className="nav-btn"
            onClick={ () => setFilterDisplay('all') }
          >
            <div id="all-btn">All</div>
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={ () => setFilterDisplay('creatures') }
          >
            <div id="creatures-btn">Creatures</div>
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={ () => setFilterDisplay('equipment') }
          >
            <div id="items-btn">Equipment</div>
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={ () => setFilterDisplay('food') }
          >
            <div id="food-btn">Food</div>
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={ () => setFilterDisplay('materials') }
          >
            <div id="materials-btn">Materials</div>
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={ () => setFilterDisplay('monsters') }
          >
            <div id="monsters-btn">Monsters</div>
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={ () => setFilterDisplay('treasure') }
          >
            <div id="treasure-btn">Treasure</div>
          </button>
        </div>
      </section>
      <section id="content" ref={ myRef }>
        {
          (canShowCards && loading
        && (
          <div className="loader-section">
            <img className="loader" src={ triforcePng } alt="zelda triforce" />
            <h3>Loading...</h3>
          </div>))
        }
        {
          (canShowCards && !cardSelected && (dataToDisplay.map((data) => (
            <Card
              content={ data }
              key={ data.name }
              handleClick={ onCardClicked }
              cardSelected={ cardSelected }
            />))))
        }
        {
          (!canShowCards && cardSelected && (dataToDisplay.map((data) => (
            <EvidencedCard
              content={ data }
              key={ data.name }
              handleClick={ onCardClicked }
              cardSelected={ cardSelected }
            />))))
        }
      </section>
      <Footer />
    </main>
  );
}
