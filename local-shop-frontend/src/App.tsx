import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/landing";
import ProductInventory from "./pages/ProductInventory";
function App() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="/" element={<Landing />} />
      <Route path="inventory" element={<ProductInventory />} />
    </Routes>
  );
}

export default App;
