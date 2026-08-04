const express = require("express");
const router = express.Router();
const db = require("../config/db");

function nettoyerHtml(html) {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extraireDate(expDateHtml) {
  const text = nettoyerHtml(expDateHtml);

  const match = text.match(/\d{4}-\d{2}-\d{2}/);

  if (!match) return null;

  return match[0];
}

function nettoyerStatut(stateHtml) {
  const text = nettoyerHtml(stateHtml).toLowerCase();

  if (text.includes("active")) return "actif";

  return "inactif";
}

router.post("/", (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.aaData || !Array.isArray(data.aaData)) {
      return res.status(400).json({
        message: "JSON Atlas invalide. Il faut coller le JSON complet avec aaData."
      });
    }

    const clients = data.aaData;

    let importes = 0;
    let erreurs = 0;

    clients.forEach((client) => {
      const nom = client.name?.trim() || "Client Atlas";
      const codeIptv = client.ActiveCode;
      const dateFin = extraireDate(client.ExpDate);
      const statut = nettoyerStatut(client.state);

      if (!codeIptv || !dateFin) {
        erreurs++;
        return;
      }

      const sql = `
        INSERT INTO clients
        (nom, email, telephone, date_debut, date_fin, statut, serveur_iptv, code_iptv, source)
        VALUES (?, ?, ?, CURDATE(), ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          nom = VALUES(nom),
          date_fin = VALUES(date_fin),
          statut = VALUES(statut),
          serveur_iptv = VALUES(serveur_iptv),
          source = VALUES(source)
      `;

      db.query(
        sql,
        [
          nom,
          "",
          "",
          dateFin,
          statut,
          "Atlas Pro",
          codeIptv,
          "Atlas Pro"
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
        message: "Import Atlas terminé.",
        total: clients.length,
        importes,
        erreurs
      });
    }, 1000);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur import Atlas."
    });
  }
});

module.exports = router;
