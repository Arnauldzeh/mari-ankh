require("./server/config/db");

const express = require("express");
const bodyParser = express.json;
const cors = require("cors");

//import routes
// const articleRoutes = require("./Routes/article");
const adminRoutes = require("./server/route/admin");
const userRoutes = require("./server/route/user");

//create server app
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser());

// app.use("/api/articles", articleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

//api/admin/login;
