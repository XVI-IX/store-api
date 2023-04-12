require("dotenv").config();
require('express-async-errors');

const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO_URI;
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products')

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.json());


// routes

app.get("/", (req, res) => {
  res.send(
    '<h1>Store API</h1> <a href="/api/v1/products">Products</a>'
  )
});


// products route

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(MONGO);
    app.listen(3000, () => {
      console.log(`Listening on port ===> ${PORT} `)
    });
  } catch (error) {
    console.error(error);
  }
}


start();