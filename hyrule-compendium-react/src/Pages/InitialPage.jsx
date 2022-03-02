import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';

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
    <div id="content">
      {
        (!loading && (allData.creatures.food.map((data) => (
          <Card content={ data } key={ data.name } />))))
      }
    </div>
  );
}
