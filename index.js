const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");

const { connectToMongoDB } = require("./connect");

const app = express();
const port = 8000;

//Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/shortUrl").then(() => {
  console.log("Connected to MongoDB");
});

//Server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/url", urlRoute);
app.use("/", staticRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
