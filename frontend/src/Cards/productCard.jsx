import React from 'react';
import './productCard.css';
import PropTypes from 'prop-types';

function ProductCard(props) {
  const {
    image, description, price, link,
  } = props;
  return (
    <div className="card">
      <img src={image} alt={description} className="product-image" />
      <h3>{description}</h3>
      <p><strong>{`R$ ${price}`}</strong></p>
      <a href={link}>
        <button type="button" className="product-button">Visitar Link</button>
      </a>
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ProductCard;
