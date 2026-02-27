import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";

import Admin from "./Admin";
import { db } from "./firebase";

export default function ProtectedAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("adminAccess");
    if (saved === "granted") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const snapshot = await get(ref(db, "config/adminPassword"));
      const dbPassword = snapshot.val();

      if (password === String(dbPassword)) {
        localStorage.setItem("adminAccess", "granted");
        setIsAuthenticated(true);
      } else {
        alert("كلمة السر غير صحيحة");
      }
    } catch (error) {
      console.error(error);
      alert("تعذر قراءة كلمة السر");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Admin />;

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>لوحة التحكم</h1>

        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "جاري التحقق..." : "دخول"}
        </button>
      </form>
    </div>
  );
}