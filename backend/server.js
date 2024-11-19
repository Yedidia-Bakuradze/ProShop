import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000; //port 3000 is used by the frontend
connectDB();
const app = express();

//GET REQUESTS
app.get("/", (req, res) => {
  res.send("API is running ...");
});
app.use("/api/products", productRoutes);

//Initalizing the server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
