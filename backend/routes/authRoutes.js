const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { nom, email, telephone, password } = req.body;

  if (!nom || !email || !telephone || !password) {
    return res.status(400).json({
      message: "Tous les champs sont obligatoires"
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO clients (nom, email, telephone, password)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nom, email, telephone, hashedPassword], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Erreur serveur"
        });
      }

      res.json({
        message: "Compte créé avec succès"
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur inscription"
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email et mot de passe obligatoires"
    });
  }

  const sql = "SELECT * FROM clients WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Erreur serveur"
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Email incorrect"
      });
    }

    const client = results[0];

    const isMatch = await bcrypt.compare(password, client.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Mot de passe incorrect"
      });
    }

    res.json({
      message: "Connexion réussie",
      client: {
        id: client.id,
        nom: client.nom,
        email: client.email,
        telephone: client.telephone
      }
    });
  });
});

module.exports = router;