import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Home from "./pages/Homepage";
import PageNotFounds from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
         <Route path="/app" element={<AppLayout />} />
         <Route path='/login' element={<Login />} />
        <Route path="*" element={<PageNotFounds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;