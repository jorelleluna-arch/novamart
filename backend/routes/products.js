const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const { category, brand, search, sort = "newest" } = req.query;
    let sql = `
      SELECT p.*, c.name AS category_name, c.slug 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE 1=1
    `;
    const params = [];

    if (category) {
      sql += ` AND c.slug = ?`;
      params.push(category);
    }
    if (brand) {
      sql += ` AND p.brand = ?`;
      params.push(brand);
    }
    if (search) {
      sql += ` AND p.name LIKE ?`;
      params.push(`%${search}%`);
    }

    const sortOptions = {
      newest: "p.created_at DESC",
      price_asc: "p.price ASC",
      price_desc: "p.price DESC",
      rating: "p.rating DESC",
    };

    sql += ` ORDER BY ${sortOptions[sort] || sortOptions.newest}`;

    const [products] = await db.execute(sql, params);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to retrieve products" });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const [products] = await db.execute(
      `SELECT p.*, c.name AS category_name, c.slug 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(products[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to retrieve product" });
  }
});

module.exports = router;