import React from 'react';
import './productCard.css';
import PropTypes from 'prop-types';

function ProductCard({ imageSrc, title, value }) {
  return (
    <div className="product-card">
      <img src={imageSrc} alt={title} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <p className="product-value">{value}</p>
        <button type="button" className="product-button">Comprar</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ProductCard;
