const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(401).send("User not found");

      const valid = await bcrypt.compare(password, results[0].password_hash);
      if (!valid) return res.status(401).send("Incorrect password");

      res.json({
        message: "Logged in",
        userId: results[0].id,
        userName: email,
      });
    }
  );
});

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (email, password_hash) VALUES (?, ?)",
    [email, hash],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const userId = result.insertId;

      // Create cart for the new user
      db.query("INSERT INTO carts (user_id) VALUES (?)", [userId], (err2) => {
        if (err2) return res.status(500).send(err2);
        res.json({ message: "User registered", userId });
      });
    }
  );
});

module.exports = router;
