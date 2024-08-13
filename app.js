const express = require("express");
require("dotenv").config();
const connectToDb = require("./config/db");
//connect to db
connectToDb();

//init app
const app = express();

//apply Middleware
app.use(express.json());

//Routers
app.use("/api/books", require("./routers/books"));
app.use("/api/authors", require("./routers/authors"));
app.use("/api/categories", require("./routers/categories"));
app.use("/api/auth", require("./routers/auth"));




const Port = process.env.PORT || 3000;
app.listen(Port, () => console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${Port}`));
