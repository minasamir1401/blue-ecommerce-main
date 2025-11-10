import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import Home from "./page/home/Home";
import ProductDetails from "./page/productDetails/ProductDetails";
import Cart from "./page/cart/Cart";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./page/CategoryPage/CategoryPage";
import SearchResults from "./page/SearchResults";
import Favorites from "./page/favorites/Favorites";

function App() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "#fff",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          }}
        />

        <ScrollToTop />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}

export default App;
