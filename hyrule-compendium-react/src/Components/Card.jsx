import PropTypes from 'prop-types';
import React from 'react';

export default function Card({ content, handleClick }) {
  const { image, name, description, id } = content;

  const onClicked = () => {
    handleClick(id);
  };

  return (
    <button
      id={ id }
      type="button"
      className="card"
      onClick={ onClicked }
    >
      <img src={ image } alt="showing the object" className="card-img" />
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
  handleClick: PropTypes.func.isRequired,
};
