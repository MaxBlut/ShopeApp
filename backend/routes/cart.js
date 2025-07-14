const express = require("express");
const router = express.Router();
const db = require("../db");

// Get user's cart
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT items.id, items.name, items.price, items.image_url, cart_items.quantity
    FROM cart_items
    JOIN carts ON carts.id = cart_items.cart_id
    JOIN items ON items.id = cart_items.item_id
    WHERE carts.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.post("/add", (req, res) => {
  const { userId, itemId, quantity } = req.body;

  // Step 1: Check if cart exists for the user
  db.query(
    "SELECT id FROM carts WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.log("request stoped caused by an error in selecting the table");
        return res.status(500).send(err);
      }

      if (results.length === 0) {
        // Step 2: No cart exists — create one
        db.query(
          "INSERT INTO carts (user_id) VALUES (?)",
          [userId],
          (err2, insertResult) => {
            if (err2) {
              console.log(
                "request stoped caused by an error in creating a new table"
              );
              return res.status(500).send(err2);
            }
            const cartId = insertResult.insertId;

            // Step 3: Add item to newly created cart
            insertOrUpdateItem(cartId);
          }
        );
      } else {
        // Cart exists
        const cartId = results[0].id;
        insertOrUpdateItem(cartId);
      }
    }
  );

  // Step 4: Logic to insert or update item in cart
  function insertOrUpdateItem(cartId) {
    db.query(
      "SELECT * FROM cart_items WHERE cart_id = ? AND item_id = ?",
      [cartId, itemId],
      (err, results) => {
        if (err) {
          console.log(
            "request stoped caused by an error in reselecting a table"
          );
          return res.status(500).send(err);
        }

        if (results.length > 0) {
          // Update quantity
          db.query(
            "UPDATE cart_items SET quantity = quantity + ? WHERE cart_id = ? AND item_id = ?",
            [quantity, cartId, itemId],
            (err2) => {
              if (err2) {
                console.log(
                  "request stoped caused by an error in updating a table"
                );
                return res.status(500).send(err2);
              }
              res.json({ message: "Item quantity updated" });
            }
          );
        } else {
          // Insert new item
          db.query(
            "INSERT INTO cart_items (cart_id, item_id, quantity) VALUES (?, ?, ?)",
            [cartId, itemId, quantity],
            (err3) => {
              if (err3) {
                console.log(
                  "request stoped caused by an error in inserting data in a new table"
                );
                return res.status(500).send(err3);
              }
              res.json({ message: "Item added to cart" });
            }
          );
        }
      }
    );
  }
});

// Update multiple items in the cart
router.put("/update", (req, res) => {
  const updates = req.body; // Expecting an array of { userId, itemId, quantity }

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const updatePromises = updates.map(({ userId, itemId, quantity }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND item_id = ?",
        [quantity, userId, itemId],
        (err) => {
          if (err) {
            console.log("error n 2");
            return reject(err);
          }
          resolve();
        }
      );
    });
  });

  Promise.all(updatePromises)
    .then(() => res.json({ message: "Cart updated successfully" }))
    .catch((error) => {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Failed to update cart" });
    });
});

router.delete("/delete", (req, res) => {
  const { userId, itemId } = req.body;

  if (!userId || !itemId) {
    return res.status(400).json({ error: "Missing userId or itemId" });
  }

  // Delete the item from cart_items
  db.query(
    "DELETE FROM cart_items WHERE cart_id = ? AND item_id = ?",
    [userId, itemId],
    (err2, result2) => {
      if (err2) {
        console.error("Error deleting item from cart:", err2);
        return res.status(500).json({ error: "Failed to delete item" });
      }

      res.json({ message: "Item removed from cart successfully" });
    }
  );
});

module.exports = router;
