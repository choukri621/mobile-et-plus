const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM serveurs_iptv ORDER BY prix ASC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { nom, prix } = req.body;

  db.query(
    "INSERT INTO serveurs_iptv (nom, prix) VALUES (?, ?)",
    [nom, prix],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Serveur ajouté" });
    }
  );
});

router.put("/:id", (req, res) => {
  const { nom, prix, actif } = req.body;

  db.query(
    "UPDATE serveurs_iptv SET nom=?, prix=?, actif=? WHERE id=?",
    [nom, prix, actif, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Serveur modifié" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM serveurs_iptv WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Serveur supprimé" });
    }
  );
});

module.exports = router;