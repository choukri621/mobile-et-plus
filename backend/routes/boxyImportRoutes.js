const express = require("express");
const router = express.Router();
const db = require("../config/db");

function cleanHtml(value) {
  if (!value) return "";
  return String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extraireTelephone(text) {
  const match = String(text || "").match(/(\+?1?\s*)?(\d{3})[\s.-]?(\d{3})[\s.-]?(\d{4})/);
  return match ? match[0] : "";
}

function extraireEmail(text) {
  const match = String(text || "").match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : "";
}

function toDate(value) {
  const text = cleanHtml(value);
  const match = text.match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
}

router.post("/", (req, res) => {
  const data = req.body;

  if (!data || !Array.isArray(data.data)) {
    return res.status(400).json({
      message: "JSON BoxyHD invalide. Il faut coller le JSON complet avec data."
    });
  }

  let importes = 0;
  let erreurs = 0;

  data.data.forEach((row) => {
    const idBoxy = cleanHtml(row[0]);
    const statut = cleanHtml(row[2]).toLowerCase().includes("enabled") ? "actif" : "inactif";
    const username = cleanHtml(row[3]);
    const notes = cleanHtml(row[7]);
    const dateDebut = toDate(row[8]);
    const dateFin = toDate(row[9]);

    const telephone = extraireTelephone(notes);
    const email = extraireEmail(notes);

    const nom = notes.replace(telephone, "").replace(email, "").trim() || username;

    if (!username || !dateFin) {
      erreurs++;
      return;
    }

    const sql = `
      INSERT INTO clients
      (nom, telephone, email, date_debut, date_fin, statut, serveur_iptv, code_iptv, source)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        nom = VALUES(nom),
        telephone = VALUES(telephone),
        email = VALUES(email),
        date_debut = VALUES(date_debut),
        date_fin = VALUES(date_fin),
        statut = VALUES(statut),
        serveur_iptv = VALUES(serveur_iptv),
        source = VALUES(source)
    `;

    db.query(
      sql,
      [
        nom,
        telephone,
        email,
        dateDebut,
        dateFin,
        statut,
        "BoxyHD",
        username || idBoxy,
        "BoxyHD"
      ],
      (err) => {
        if (err) {
          console.log(err);
          erreurs++;
        } else {
          importes++;
        }
      }
    );
  });

  setTimeout(() => {
    res.json({
      message: "Import BoxyHD terminé.",
      total: data.data.length,
      importes,
      erreurs
    });
  }, 1000);
});

module.exports = router;