import React from 'react';
import './productCard.css';
import PropTypes from 'prop-types';

function ProductCard(props) {
  const { image, description, price } = props;
  return (
    <div className="product-card">
      <img src={image} alt={description} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{description}</h2>
        <p className="product-value">{`R$ ${price}`}</p>
        <button type="button" className="product-button">Comprar</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductCard;
