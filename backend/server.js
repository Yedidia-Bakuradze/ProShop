import express from "express";
import products from "./data/products.js";
const port = 5000; //port 3000 is used by the frontend

const app = express();

//GET REQUESTS
app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((pro) => pro._id === req.params.id);
  res.json(product);
});
//Initalizing the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
