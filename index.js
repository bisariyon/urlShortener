const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
