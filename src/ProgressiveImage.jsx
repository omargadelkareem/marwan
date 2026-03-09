import React from "react";
import ProgressiveImage from "./ProgressiveImage";

export default function ProductCard({ product, showDelete = false, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <ProgressiveImage
          thumbSrc={product.thumbBase64 || product.imageBase64}
          src={product.fullBase64 || product.imageBase64}
          alt={product.name}
          priority={false}
          aspect="4 / 5"
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.price} جنيه</p>

        {showDelete && (
          <button className="delete-btn" onClick={() => onDelete?.(product.id)}>
            حذف المنتج
          </button>
        )}
      </div>
    </div>
  );
}