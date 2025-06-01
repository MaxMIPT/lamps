import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { Spinner, Box, Text } from "@chakra-ui/react";

const HomePage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка при получении данных");
        return res.json();
      })
      .then((data) => {
        const parsed = data.data.map((item) => ({
          id: item.product_id,
          name: item.name,
          description: item.desc,
          price: item.price,
          image: item.image,
        }));
        setProducts(parsed);
      })
      .catch((err) => {
        setError(err.message || "Ошибка");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box p={5}>
        <Spinner size="xl" />
      </Box>
    );

  if (error)
    return (
      <Box p={5}>
        <Text color="red.500">Ошибка: {error}</Text>
      </Box>
    );

  return <ProductGrid products={products} onAddToCart={onAddToCart} />;
};

export default HomePage;
