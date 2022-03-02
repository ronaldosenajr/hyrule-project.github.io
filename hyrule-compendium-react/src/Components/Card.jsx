import PropTypes from 'prop-types';
import React from 'react';

export default function Card({ content }) {
  const { image, name, description } = content;
  return (
    <button type="button" className="card" onClick={ () => console.log('teste') }>
      <img src={ image } alt="showing the object" />
      <div className="container">
        <h3>{ name }</h3>
        <p>{ description }</p>
      </div>
    </button>
  );
}

Card.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
