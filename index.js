const express = require("express");
require("dotenv").config()
const cors = require("cors") // handle cross origin 
const UserRoute = require("./routes/userRoute")
const BookRoute = require("./routes/bookRoute")
const favoriteRoute = require("./routes/favoriteRoute")
const cartRoute = require("./routes/cartRoute")
const orderRoute = require("./routes/orderRoute")
const requestRoute = require("./routes/bookRequestRoute");


const { initializeDatabase } = require("./db/db.connect")

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  method: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],              // this allows request from any origin
  credentials: true,        // this allows cookies, authorization headers, TLS certi..
  optionSuccessStatus: 200, // set status code 200 fir successful request..
}

// middleware
app.use(cors(corsOptions))  // allowing the browser to make cross origin request to the server.
app.use(express.json()) 


// Routes
app.use("/api/v1", UserRoute)
app.use("/api/v1", BookRoute)
app.use("/api/v1", favoriteRoute)
app.use("/api/v1", cartRoute)
app.use("/api/v1", orderRoute)
app.use("/api/v1", requestRoute)


app.get("/", (req, res) => {
  res.send("Hello server!!");
});

// connect db..
initializeDatabase()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
