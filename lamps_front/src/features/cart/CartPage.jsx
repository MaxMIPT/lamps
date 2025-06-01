import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  VStack,
  HStack,
  Divider,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const CartPage = ({ cart, onAdd, onRemove, onClear, navigate }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:8001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          status: "created",
          products: cart.map((item) => ({
            product_id: item.product_id,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });
      if (!response.ok) throw new Error("Ошибка при оформлении заказа");
      onClose();
      setEmail("");
      onClear();
      alert("Заказ успешно отправлен");
      navigate("/");
    } catch (error) {
      alert("Ошибка: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Заказ
      </Text>

      <VStack align="stretch" spacing={3}>
        {cart.map((item, index) => (
          <HStack key={`${item.product_id}-${index}`} justify="space-between">
            <Text>{item.name}</Text>
            <HStack>
              <IconButton
                size="sm"
                icon={<MinusIcon />}
                aria-label="Уменьшить количество"
                onClick={() => onRemove(item.product_id)}
              />
              <Text>{item.quantity}</Text>
              <IconButton
                size="sm"
                icon={<AddIcon />}
                aria-label="Увеличить количество"
                onClick={() => onAdd(item.product_id)}
              />
            </HStack>
          </HStack>
        ))}
      </VStack>

      <Divider my={4} />

      <Text fontWeight="bold" fontSize="md" mb={6}>
        Стоимость: {total} ₽
      </Text>

      <Button colorScheme="gray" size="md" onClick={onOpen}>
        Оформить заказ
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Подтверждение заказа</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Введите электронную почту</Text>
            <Input
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit}
              colorScheme="gray"
              isLoading={submitting}
            >
              Подтвердить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CartPage;
