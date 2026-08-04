const express = require("express");
const router = express.Router();
const db = require("../config/db");
const {
  envoyerEmailRendezVous,
  envoyerEmailReparation
} = require("../services/emailService");

router.get("/", (req, res) => {
  db.query("SELECT * FROM rendez_vous ORDER BY date_rdv DESC", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.json(results);
  });
});

router.post("/", (req, res) => {
  const {
    nom,
    email,
    telephone,
    type_rdv,
    serveur_iptv,
    date_rdv,
    heure_rdv,
    message
  } = req.body;

  if (!nom || !email || !telephone || !type_rdv || !date_rdv || !heure_rdv) {
    return res.status(400).json({
      message: "Tous les champs obligatoires doivent être remplis."
    });
  }

  const checkSql = `
    SELECT id FROM rendez_vous
    WHERE date_rdv = ?
    AND heure_rdv = ?
  `;

  db.query(checkSql, [date_rdv, heure_rdv], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    if (results.length > 0) {
      return res.status(400).json({
        message: "Ce créneau n'est pas disponible. Choisissez une autre heure."
      });
    }

    const insertSql = `
      INSERT INTO rendez_vous
      (nom, email, telephone, type_rdv, serveur_iptv, date_rdv, heure_rdv, message, statut)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [
        nom,
        email,
        telephone,
        type_rdv,
        serveur_iptv || null,
        date_rdv,
        heure_rdv,
        message || "",
        "en attente"
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Erreur lors de la réservation."
          });
        }
   db.query(
  `INSERT INTO admin_notifications (titre, message, type)
   VALUES (?, ?, ?)`,
  [
    "Nouveau rendez-vous",
    `${nom} a réservé un rendez-vous le ${date_rdv} à ${heure_rdv}.`,
    "rendez-vous"
  ]
);

envoyerEmailRendezVous(
    email,
    nom,
    type_rdv,
    date_rdv,
    heure_rdv

);
        db.query(
  `INSERT INTO notifications (client_email, titre, message)
   VALUES (?, ?, ?)`,
  [
    email,
    "Rendez-vous confirmé",
    `Votre rendez-vous du ${date_rdv} à ${heure_rdv} est confirmé.`
  ]
);

        res.json({
          message: "Rendez-vous réservé avec succès.",
          id: result.insertId
        });
      }
    );
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM rendez_vous WHERE id = ?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.json({ message: "Rendez-vous supprimé." });
  });
});

module.exports = router;