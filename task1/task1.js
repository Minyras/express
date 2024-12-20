const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const employees = [
  { id: 1, name: "peri", age: 30 },
  { id: 2, name: "minure", age: 25 },
  { id: 3, name: "lale", age: 28 },
];

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
