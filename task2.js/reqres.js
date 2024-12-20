const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = [
  { id: 1, name: "Laptop", price: 1200, quantity: 10 },
  { id: 2, name: "Phone", price: 800, quantity: 20 },
  { id: 3, name: "Tablet", price: 400, quantity: 15 },
  { id: 4, name: "Headphones", price: 100, quantity: 50 },
  { id: 5, name: "Monitor", price: 300, quantity: 12 },
  { id: 6, name: "Keyboard", price: 50, quantity: 30 },
  { id: 7, name: "Mouse", price: 25, quantity: 40 },
  { id: 8, name: "Charger", price: 20, quantity: 60 },
  { id: 9, name: "Speaker", price: 150, quantity: 25 },
  { id: 10, name: "Smartwatch", price: 200, quantity: 18 },
];

app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});
app.get("/products-paginated", (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const paginatedProducts = products.slice(offset, offset + limit);

  res.json({
    total: products.length,
    limit: limit,
    offset: offset,
    data: paginatedProducts,
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
