const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/items", require("./routes/items.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/cart", require("./routes/cart.js"));
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});
