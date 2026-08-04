const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/:email", (req, res) => {
  const email = req.params.email;

  const sql = `
    SELECT *
    FROM notifications
    WHERE client_email = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.json(results);
  });
});

module.exports = router;