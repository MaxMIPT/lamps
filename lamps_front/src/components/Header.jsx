import React from "react";
import { Box, Flex, Text, HStack, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Header = ({ cartCount }) => (
  <Box bg="gray.300" px={5} py={3}>
    <Flex justify="space-between" align="center">
      <Link to="/">
        <Flex align="center">
          <Image src={logo} alt="Логотип" boxSize="40px" mr={2} />
          <Text fontWeight="bold" fontSize="lg">
            Завод лампочек
          </Text>
        </Flex>
      </Link>
      <HStack spacing={3}>
        <Button as={Link} to="/" size="sm" colorScheme="red" variant="solid">
          Продукция
        </Button>
        <Button
          as={Link}
          to="/cart"
          size="sm"
          colorScheme="pink"
          variant="outline"
        >
          Корзина ({cartCount})
        </Button>
      </HStack>
    </Flex>
  </Box>
);

export default Header;
