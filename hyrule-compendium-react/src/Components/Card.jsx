import PropTypes from 'prop-types';
import React from 'react';

export default function Card({ content }) {
  const { image, name, description, id, category } = content;
  return (
    <button
      id={ id }
      type="button"
      className="card"
      onClick={ () => console.log(category) }
    >
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
    id: PropTypes.number,
    category: PropTypes.string,
  }).isRequired,
};
