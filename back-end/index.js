const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./Products/Products");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Our Online Shop API...");
});

app.get("/products", (req, res) => {
    res.send(products);
});





const port = process.env.PORT || 5000

app.listen(port, console.log(`Server running on port ${port}`));