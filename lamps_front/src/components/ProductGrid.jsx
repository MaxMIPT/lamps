import React from "react";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <Box p={5}>
        <Text textAlign="center" fontSize="lg" color="gray.500">
          Нет доступных товаров
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
      spacing={5}
      p={5}
      flex="1"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
