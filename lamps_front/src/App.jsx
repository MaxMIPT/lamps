import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState, useMemo, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./features/cart/CartPage";

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.error("Ошибка загрузки продуктов:", err));
  }, []);

  const handleAddToCart = (id) => {
    setCart((prev) => [...prev, id]);
  };

  const handleRemoveOneFromCart = useCallback((id) => {
    setCart((prev) => {
      const index = prev.indexOf(id);
      if (index === -1) return prev;
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  }, []);

  const handleClearCart = () => setCart([]);

  const getCartDetails = (cartIds, products) => {
    const counts = cartIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([id, quantity]) => {
      const product = products.find((p) => p.product_id === id);
      return {
        product_id: id,
        name: product?.name || "",
        price: product?.price || 0,
        quantity,
      };
    });
  };

  const cartDetails = useMemo(
    () => getCartDetails(cart, products),
    [cart, products]
  );

  const CartPageWithNavigate = (props) => {
    const navigate = useNavigate();
    return <CartPage {...props} navigate={navigate} />;
  };

  return (
    <Router>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header cartCount={cart.length} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPageWithNavigate
                cart={cartDetails}
                onAdd={handleAddToCart}
                onRemove={handleRemoveOneFromCart}
                onClear={handleClearCart}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
