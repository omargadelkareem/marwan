import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchProductsPage, fetchMoreProductsPage } from "./poduct";

export default function Home() {
  const PAGE_SIZE = 15;

  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { items, lastCursor } = await fetchProductsPage(PAGE_SIZE);
        setProducts(items);
        setCursor(lastCursor);
        setHasMore(items.length === PAGE_SIZE);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;
    try {
      setLoadingMore(true);
      const { items, lastCursor } = await fetchMoreProductsPage(cursor, PAGE_SIZE);
      setProducts((prev) => [...prev, ...items]);
      setCursor(lastCursor);
      setHasMore(items.length === PAGE_SIZE);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <div>
            <h1 className="brand">Luxe Lingerie</h1>
            <p className="subtitle">Elegant. Soft. Feminine.</p>
          </div>
          <Link to="/admin-secret-2025" className="admin-btn">لوحة التحكم</Link>
        </div>
      </header>

      <section className="hero container">
        <span className="hero-chip">Exclusive Collection</span>
        <h2>تشكيلة فاخرة بواجهة أكثر أناقة واحترافية</h2>
      </section>

      <section className="container">
        {loading ? (
          <div className="empty-state"><h3>جاري تحميل المنتجات...</h3></div>
        ) : products.length === 0 ? (
          <div className="empty-state"><h3>لا توجد منتجات حاليًا</h3></div>
        ) : (
          <>
            <div className="grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div style={{ display: "flex", justifyContent: "center", padding: "20px 0 60px" }}>
                <button className="admin-btn" onClick={handleLoadMore} disabled={loadingMore}>
                  {loadingMore ? "جاري تحميل المزيد..." : "عرض المزيد"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}