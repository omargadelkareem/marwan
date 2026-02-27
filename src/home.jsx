import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { listenToProducts } from "./poduct";


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToProducts(setProducts);
    return () => unsubscribe();
  }, []);

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <div>
            <h1 className="brand">Luxe Lingerie</h1>
            <p className="subtitle">Elegant. Soft. Feminine.</p>
          </div>

          <Link to="/admin-secret-2025" className="admin-btn">
            لوحة التحكم
          </Link>
        </div>
      </header>

      <section className="hero container">
        <span className="hero-chip">Exclusive Collection</span>
        <h2>تشكيلة فاخرة بواجهة أكثر أناقة واحترافية</h2>
        <p>منتجاتك تُعرض مباشرة من Firebase Realtime Database</p>
      </section>

      <section className="container">
        {products.length === 0 ? (
          <div className="empty-state">
            <h3>لا توجد منتجات حاليًا</h3>
            <p>ابدأ بإضافة أول منتج من لوحة التحكم.</p>
          </div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}