const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Demonstration endpoint only.
// Add administrator authentication before production use.
router.get("/admin", async (req, res) => {
  try {
    const [orders] = await db.execute(`
      SELECT o.id, u.full_name AS customer_name, o.created_at, 
             o.total_amount, o.payment_status, o.fulfillment_status
      FROM orders o
      JOIN users u ON u.id = o.user_id
      ORDER BY o.created_at DESC
    `);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to retrieve orders" });
  }
});

module.exports = router;