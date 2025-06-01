import React from "react";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => (
  <Box
    border="1px solid"
    borderColor="blackAlpha.300"
    p={3}
    borderRadius="md"
    boxShadow="md"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    height="100%"
  >
    {/* Отображение изображения товара */}
    <Box
      w="100%"
      h="200px"
      mb={3}
      borderRadius="md"
      overflow="hidden"
      bg="gray.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <Text color="gray.500">Нет изображения</Text>
      )}
    </Box>

    {/* Название, описание, цена */}
    <Box mb={2}>
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold" fontSize="md">
          {product.name}
        </Text>
        <Text fontSize="sm" color="green.600">
          {product.price} ₽
        </Text>
      </Flex>
      <Text fontSize="sm" color="gray.600">
        {product.description}
      </Text>
    </Box>

    {/* Кнопка добавления в корзину */}
    <Flex justify="flex-end">
      <IconButton
        icon={<FaShoppingCart />}
        onClick={() => onAddToCart(product.id)}
        colorScheme="pink"
        aria-label="Добавить в корзину"
        size="sm"
      />
    </Flex>
  </Box>
);

export default ProductCard;
