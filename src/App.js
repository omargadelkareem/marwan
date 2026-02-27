import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles.css";
import ProtectedAdmin from "./ProtectedAdmin";
import Home from "./home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-secret-2025" element={<ProtectedAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}