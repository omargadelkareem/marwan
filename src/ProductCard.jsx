import React from "react";

export default function ProductCard({ product, showDelete = false, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.imageBase64}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.price} جنيه</p>

        {showDelete && (
          <button
            className="delete-btn"
            onClick={() => onDelete?.(product.id)}
          >
            حذف المنتج
          </button>
        )}
      </div>
    </div>
  );
}