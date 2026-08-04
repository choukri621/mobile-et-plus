const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const db = require("../config/db");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/test", (req, res) => {
  res.send("Route import-excel fonctionne");
});

function formatDate(value) {
  if (!value) return null;

  // Date Excel (nombre)
  if (typeof value === "number") {
    const d = XLSX.SSF.parse_date_code(value);

    return `${d.y}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
  }

  value = String(value).trim();

  // Format JJ/MM/AAAA
  if (value.includes("/")) {
    const [j, m, a] = value.split("/");

    return `${a}-${m.padStart(2, "0")}-${j.padStart(2, "0")}`;
  }

  // Format JJ-MM-AAAA
  if (value.includes("-")) {
    const [j, m, a] = value.split("-");

    if (j.length === 2) {
      return `${a}-${m.padStart(2, "0")}-${j.padStart(2, "0")}`;
    }

    return value;
  }

  return null;
}

router.post("/", upload.single("file"), (req, res) => {
  console.log("IMPORT EXCEL APPELÉ");

  if (!req.file) {
    console.log("Aucun fichier reçu");
    return res.status(400).json({ message: "Aucun fichier reçu" });
  }

  console.log("FICHIER:", req.file.originalname);

  const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: ""
  });

  console.log("ROWS:", rows.length);
  console.log("PREMIERE LIGNE:", rows[0]);

  let importes = 0;
  let erreurs = 0;

  rows.forEach((row) => {
   const nom = row.Nom || row.nom || row.Name || row.__EMPTY || "";
const codeIptv = String(row.Login || row.login || row.__EMPTY_1 || row.__EMPTY_3 || "").trim();
const dateDebut = formatDate(row["Date deb"] || row["Date début"] || row.date_debut || row.__EMPTY_6);
const dateFin = formatDate(row["Date fin"] || row.date_fin || row.__EMPTY_7);
const statut = String(row.Statut || row.statut || row.__EMPTY_10 || "").toLowerCase().includes("actif")
      ? "actif"
      : "inactif";

    if (!nom || !codeIptv || !dateFin) {
      console.log("LIGNE IGNORÉE:", row);
      erreurs++;
      return;
    }

    const sql = `
      INSERT INTO clients
      (nom, telephone, email, date_debut, date_fin, statut, serveur_iptv, code_iptv, source)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        nom = VALUES(nom),
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
        "",
        "",
        dateDebut,
        dateFin,
        statut,
        "Smart IPTV",
        codeIptv,
        "Smart IPTV"
      ],
      (err) => {
        if (err) {
          console.log("ERREUR SQL:", err.sqlMessage);
          erreurs++;
        } else {
          importes++;
        }
      }
    );
  });

  setTimeout(() => {
    console.log("IMPORT FINI:", importes, "importés", erreurs, "erreurs");

    res.json({
      message: `${importes} clients importés. Erreurs : ${erreurs}`,
      total: rows.length,
      importes,
      erreurs
    });
  }, 1500);
});

module.exports = router;