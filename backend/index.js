const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectToMongo } = require("./db");

dotenv.config();

const port = process.env.PORT || 5000;
var cors = require("cors");

connectToMongo();
console.log(connectToMongo);

//Middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", require("./routes/route"));

app.listen(port, () => {
  console.log("Listening to port number " + port);
});
