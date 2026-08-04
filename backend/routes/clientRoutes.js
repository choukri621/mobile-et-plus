const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET tous les clients
router.get("/", (req, res) => {
  db.query("SELECT * FROM clients ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST ajouter client annuel 80$
router.post("/", (req, res) => {
  const {
  nom,
  telephone,
  email,
  serveur_iptv,
  date_debut,
  date_fin
} = req.body;

const sql = `
INSERT INTO clients
(nom, telephone, email, serveur_iptv, date_debut, date_fin, statut)
VALUES (?, ?, ?, ?, ?, ?, 'actif')
`;

db.query(sql, [
  nom,
  telephone,
  email,
  serveur_iptv,
  date_debut,
  date_fin], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Client ajouté avec succès", id: result.insertId });
  });
});

// DELETE supprimer client
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM clients WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Client supprimé" });
  });
});
// PUT modifier client
router.put("/:id", (req, res) => {
  const {
    nom,
    telephone,
    email,
    serveur_iptv,
    date_debut,
    date_fin,
    statut
  } = req.body;

  const sql = `
    UPDATE clients
    SET
      nom = COALESCE(?, nom),
      telephone = COALESCE(?, telephone),
      email = COALESCE(?, email),
      serveur_iptv = COALESCE(?, serveur_iptv),
      date_debut = COALESCE(?, date_debut),
      date_fin = COALESCE(?, date_fin),
      statut = COALESCE(?, statut)
    WHERE id = ?
  `;

  db.query(
    sql,
    [nom, telephone, email, serveur_iptv, date_debut, date_fin, statut, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Client modifié" });
    }
  );
});
module.exports = router;