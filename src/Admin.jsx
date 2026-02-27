import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { compressImage } from "./imageHelpers";
import { addProduct, deleteProduct, listenToProducts } from "./poduct";
import ProductCard from "./ProductCard";


export default function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToProducts(setProducts);
    return () => unsubscribe();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const previewBase64 = await compressImage(file, 500, 0.7);
      setPreview(previewBase64);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("اختار صورة أولًا");
      return;
    }

    try {
      setLoading(true);

      const imageBase64 = await compressImage(image, 900, 0.75);

      await addProduct({
        name: name.trim(),
        price: Number(price),
        imageBase64,
      });

      setName("");
      setPrice("");
      setImage(null);
      setPreview("");
      e.target.reset();

      alert("تمت إضافة المنتج بنجاح");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إضافة المنتج");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("هل تريد حذف هذا المنتج؟");
    if (!ok) return;

    try {
      await deleteProduct(id);
      alert("تم حذف المنتج");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحذف");
    }
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
            <button type="button" className="admin-btn" onClick={handleLogout}>
              تسجيل خروج
            </button>
          </div>
        </div>
      </header>

      <section className="container admin-layout">
        <div className="admin-form-card">
          <h2>إضافة منتج جديد</h2>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="field">
              <label>اسم المنتج</label>
              <input
                type="text"
                placeholder="مثال: طقم دانتيل فاخر"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>السعر</label>
              <input
                type="number"
                placeholder="مثال: 950"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>الصورة</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            {preview && (
              <div className="preview-box">
                <img src={preview} alt="preview" />
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "جاري الحفظ..." : "إضافة المنتج"}
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
              <p>أضف أول منتج من النموذج الجانبي.</p>
            </div>
          ) : (
            <div className="grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showDelete
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}