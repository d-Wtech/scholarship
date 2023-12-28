import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDatabase } from "./src/connection/db.conn.js";
import authRouter from "./src/routes/auth.route.js";
import adminRouter from "./src/routes/admin.route.js";
import userRouter from "./src/routes/user.route.js";
import userRecordRouter from "./src/routes/userRecord.route.js";
import paymentRouter from "./src/routes/payment.route.js";

// configuring dotenv
dotenv.config();

// connecting to the database
connectToDatabase(process.env.MONGO_URI);

// creating express application
const app = express();

// port number
const PORT = process.env.PORT || 9090;

// setting up CORS
app.use(
  cors({
    origin: ["http://dnyanankur.in", "http://api.dnyanankur.in", "http://localhost:5500"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Additional middleware to handle headers
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://dnyanankur.in','http://api.dnyanankur.in'); // Replace with your specific origin
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204); // Pre-flight request
  } else {
    next();
  }
});

// middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api", authRouter);
app.use("/api", adminRouter);
app.use("/api", userRouter);
app.use("/api", userRecordRouter);
app.use("/api", paymentRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// starting express server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return err;
  }
  console.log("Server started on port " + PORT);
});
