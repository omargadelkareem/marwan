import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { compressImage } from "./imageHelpers";
import { addProduct, deleteProduct, listenToProducts } from "./poduct";
import ProductCard from "./ProductCard";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);     // بدل image واحدة
  const [previews, setPreviews] = useState([]); // بدل preview واحدة
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToProducts(setProducts);
    return () => unsubscribe();
  }, []);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    if (files.length) {
      const pv = await Promise.all(
        files.slice(0, 6).map((f) => compressImage(f, 260, 0.9)) // previews عالية الجودة
      );
      setPreviews(pv);
    } else {
      setPreviews([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images.length) {
      alert("اختار صورة/صور أولًا");
      return;
    }

    try {
      setLoading(true);

      // نرفع المنتجات واحد واحد (أو Promise.all لو حابب)
      for (const img of images) {
        const thumbBase64 = await compressImage(img, 260, 0.9, "image/jpeg");   // thumb ممتازة
       const fullBase64  = await compressImage(img, 2400, 1, "image/jpeg"); // full عالية جدًا

        await addProduct({
          name: name.trim(),
          price: Number(price),
          thumbBase64,
          fullBase64,
        });
      }

      setName("");
      setPrice("");
      setImages([]);
      setPreviews([]);
      e.target.reset();

      alert("تمت إضافة المنتجات بنجاح");
    } catch (error) {
      console.error(error);
      alert(error?.message || "حدث خطأ أثناء إضافة المنتجات");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل تريد حذف هذا المنتج؟")) return;
    await deleteProduct(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAccess");
    window.location.reload();
  };

  return (
    <div className="page admin-page">
      <header className="topbar admin-topbar">
        <div className="container topbar-inner">
          <div>
            <h1 className="brand">لوحة التحكم</h1>
            <p className="subtitle">إدارة المنتجات</p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/" className="admin-btn secondary-btn">رجوع للمتجر</Link>
            <button type="button" className="admin-btn" onClick={handleLogout}>تسجيل خروج</button>
          </div>
        </div>
      </header>

      <section className="container admin-layout">
        <div className="admin-form-card">
          <h2>إضافة منتج/منتجات</h2>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="field">
              <label>اسم المنتج</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="field">
              <label>السعر</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="field">
              <label>الصور (يمكن اختيار أكثر من صورة)</label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} required />
            </div>

            {previews.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {previews.map((p, i) => (
                  <div key={i} className="preview-box">
                    <img src={p} alt={`preview-${i}`} />
                  </div>
                ))}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "جاري الحفظ..." : `إضافة (${images.length || 0}) منتج`}
            </button>
          </form>
        </div>

        <div className="admin-products">
          <div className="section-head">
            <h2>المنتجات الحالية</h2>
            <span>{products.length} منتج</span>
          </div>

          {products.length === 0 ? (
            <div className="empty-state small">
              <h3>لا توجد منتجات</h3>
            </div>
          ) : (
            <div className="grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} showDelete onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}