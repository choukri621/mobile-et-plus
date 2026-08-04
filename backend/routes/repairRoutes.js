const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM reparations ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.json(results);
  });
});

router.get("/track/:code", (req, res) => {
  const code = req.params.code;

  db.query(
    "SELECT * FROM reparations WHERE tracking_code = ?",
    [code],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Aucune réparation trouvée." });
      }

      res.json(results[0]);
    }
  );
});

router.post("/", (req, res) => {
  const {
    nom,
    email,
    telephone,
    appareil,
    probleme,
    date_rdv,
    heure_rdv
  } = req.body;

  if (!nom || !email || !telephone || !appareil || !probleme) {
    return res.status(400).json({
      message: "Tous les champs obligatoires doivent être remplis."
    });
  }

  const sql = `
    INSERT INTO reparations
    (nom, email, telephone, appareil, probleme, date_rdv, heure_rdv, statut, confirmed, tracking_code)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nom,
      email,
      telephone,
      appareil,
      probleme,
      date_rdv || null,
      heure_rdv || null,
      "demande envoyée",
      false,
      null
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      const notifSql = `
        INSERT INTO notifications (client_email, titre, message)
        VALUES (?, ?, ?)
      `;

      db.query(notifSql, [
        email,
        "Demande de réparation envoyée",
        "Votre demande de réparation a été envoyée. Le magasin doit encore la confirmer avant de générer un numéro de suivi."
      ]);

      console.log(`SMS simulé à ${telephone}: Demande de réparation reçue. En attente de confirmation.`);

      res.json({
        message: "Demande envoyée. En attente de confirmation par le magasin."
      });
    }
  );
});

router.put("/:id/accept", (req, res) => {
  const id = req.params.id;

  const trackingCode =
    "REP-" +
    new Date().toISOString().slice(0, 10).replaceAll("-", "") +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  const getSql = "SELECT * FROM reparations WHERE id = ?";

  db.query(getSql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Réparation introuvable." });
    }

    const rep = results[0];

    const updateSql = `
      UPDATE reparations
      SET confirmed = true,
          tracking_code = ?,
          statut = 'reçu au magasin'
      WHERE id = ?
    `;

    db.query(updateSql, [trackingCode, id], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      const notifSql = `
        INSERT INTO notifications (client_email, titre, message)
        VALUES (?, ?, ?)
      `;

      db.query(notifSql, [
        rep.email,
        "Réparation acceptée",
        `Votre réparation a été acceptée. Votre numéro de suivi est : ${trackingCode}`
      ]);

      console.log(`SMS simulé à ${rep.telephone}: Réparation acceptée. Code suivi: ${trackingCode}`);

      res.json({
        message: "Réparation acceptée.",
        tracking_code: trackingCode
      });
    });
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { statut } = req.body;

  const sql = "UPDATE reparations SET statut = ? WHERE id = ?";

  db.query(sql, [statut, id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.json({ message: "Statut mis à jour." });
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM reparations WHERE id = ?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.json({ message: "Réparation supprimée." });
  });
});

module.exports = router;