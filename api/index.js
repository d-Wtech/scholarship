import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectToDatabase } from "./src/connection/db.conn.js";
import testRouter from "./src/routes/test.route.js";

// configuring dotenv
dotenv.config();

// connecting to database
connectToDatabase(process.env.MONGO_URI);

// creating express application
const app = express();

// port number
const PORT = process.env.PORT || 9090;

// middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api", testRouter);

// starting express server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return err;
  }
  console.log("Server started on port " + PORT);
});
