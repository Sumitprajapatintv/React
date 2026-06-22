import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Home from "./pages/Home";
import PageNotFounds from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
         <Route path="*" element={<PageNotFounds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;