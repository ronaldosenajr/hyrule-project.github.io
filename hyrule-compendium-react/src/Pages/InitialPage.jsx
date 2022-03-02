import React, { useState, useEffect } from 'react';

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
    console.log(allData);
  }, []);

  return (
    <div>
      InitialPage
      {
        (!loading && (allData.creatures.food.map((value) => (
          <div key={ value.id }>
            <div style={ { backgroundColor: 'red', marginBottom: '10px' } }>
              {' '}
              Name:
              {' '}
              {value.name}
            </div>
          </div>))))
      }
    </div>
  );
}
