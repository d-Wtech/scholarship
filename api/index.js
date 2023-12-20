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

// creating an express application
const app = express();

// port number
const PORT = process.env.PORT || 9090;

// setting up CORS globally
app.use(
  cors({
    origin: ["http://dnyanankur.in", "http://localhost:9090"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

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

// handle OPTIONS requests for the specific route
app.options("/api/user-login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://dnyanankur.in");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200).send();
});

// Apply CORS headers for the specific route
app.options("/api/admin/login", cors()); // Enable preflight request for the route

app.post("/api/admin/login", cors(), (req, res) => {
  // Your logic for admin login

  // Respond with appropriate CORS headers
  res.header("Access-Control-Allow-Origin", "http://www.dnyanankur.in");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  // Your response logic
  res.send("Admin login successful");
});

app.get("/",(req,res)=>{
  res.status("Hello World");
})

// starting the express server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return err;
  }
  console.log("Server started on port " + PORT);
});
