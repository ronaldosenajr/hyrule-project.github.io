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
  console.log(filteredKeys);

  return (
    <button
      id={ id }
      type="button"
      className="evidenceCard"
      onClick={ onClicked }
    >
      <img src={ image } alt="showing the object" />
      <div className="container">
        <h3>{ name }</h3>
        <p>{ description }</p>
        <ul>
          {
            filteredKeys.map((value) => (
              <li
                key={ content[value] }
              >
                {`${value}: ${content[value]}`}
              </li>))
          }
        </ul>
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
