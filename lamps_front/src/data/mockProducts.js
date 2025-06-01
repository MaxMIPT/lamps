const mockProducts = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: `Лампа ${i + 1}`,
  description: "Описание лампы",
}));

export default mockProducts;
