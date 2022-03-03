import PropTypes from 'prop-types';
import React from 'react';

export default function EvidencedCard({ content, handleClick }) {
  const { image, name, description, id } = content;

  const onClicked = () => {
    handleClick(id);
  };

  const keys = Object.keys(content);
  const filteredKeys = keys.filter((value) => value !== 'id'
&& value !== 'description' && value !== 'name' && value !== 'image');

  return (
    <button
      id={ id }
      type="button"
      className="evidenceCard"
      onClick={ onClicked }
    >
      <img src={ image } alt="showing the object" className="card-img" />
      <div className="container">
        <h3>{ name }</h3>
        <p>{ description }</p>
        <div className="more-content">
          {
            filteredKeys.map((value) => (
              <p key={ content[value] }>
                {
                  `${value.charAt(0).toUpperCase() + value.slice(1)
                    .split('_').join(' ')}: 
                    ${content[value]}`
                }
              </p>
            ))
          }
        </div>
      </div>
    </button>
  );
}

EvidencedCard.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    category: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
