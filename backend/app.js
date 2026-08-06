const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const db = require("./config/db");

const clientRoutes = require("./routes/clientRoutes");
const rendezVousRoutes = require("./routes/rendezVousRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const repairRoutes = require("./routes/repairRoutes");
const authRoutes = require("./routes/authRoutes");
const cron = require("node-cron");

const {
  envoyerEmail,
  envoyerEmailRappelRendezVous,
  envoyerSMSExpiration
} = require("./services/emailService");

const notificationRoutes = require("./routes/notificationRoutes");
const supportRoutes = require("./routes/supportRoutes");
const { recupererClientsAtlas } = require("./services/atlasService");
const atlasImportRoutes = require("./routes/atlasImportRoutes");
const boxyImportRoutes = require("./routes/boxyImportRoutes");
const excelImportRoutes = require("./routes/excelImportRoutes");
const serveurRoutes = require("./routes/serveurRoutes");

app.use(cors());

app.use(express.json({ limit: "20mb" }));
app.use(
  express.urlencoded({
    limit: "20mb",
    extended: true
  })
);


app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

/* ROUTES */

app.use('/api/clients', clientRoutes);
app.use('/api/rendez-vous', rendezVousRoutes);
app.use('/api/disponibilites', availabilityRoutes);
app.use('/api/reparations', repairRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/notifications", notificationRoutes);
app.use("/api/support",supportRoutes);
app.use("/api/import-atlas", atlasImportRoutes);
app.use("/api/import-boxy", boxyImportRoutes);
app.use("/api/import-excel", excelImportRoutes);
app.use("/api/serveurs", serveurRoutes);
/* PAGE TEST */
app.get("/sync-atlas", async (req, res) => {

  try {

    const clients = await recupererClientsAtlas();

    res.json(clients);

  } catch(err) {

    console.log(err);

    res.status(500).json(err);

  }

});
app.get('/', (req, res) => {
    res.send('Backend IPTV fonctionne');
});

/* TEST DB */

app.get('/test-db', (req, res) => {

    db.query('SELECT 1 + 1 AS result', (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

});

/* TEST EMAIL */

app.get("/test-email", async (req, res) => {
  try {
    await envoyerEmail(
      "choukri.bzd@gmail.com",
      "Ahmed",
      new Date(),
      7
    );

    res.send("Email envoyé avec succès");
  } catch (err) {
    console.error("Erreur test email :", err);
    res.status(500).send("Erreur email");
  }
});

/* NOTIFICATION ABONNEMENT */
/* NOTIFICATION ABONNEMENT */
/* NOTIFICATION ABONNEMENT IPTV */

console.log("Cron IPTV chargé");

cron.schedule(
  "0 9 * * *",
  () => {
    console.log("Vérification des abonnements IPTV");

    const sql = `
      SELECT *
      FROM clients
      WHERE DATEDIFF(date_fin, CURDATE()) BETWEEN 0 AND 7
      AND statut = 'actif'
      AND (
        (email IS NOT NULL AND TRIM(email) <> '')
        OR
        (telephone IS NOT NULL AND TRIM(telephone) <> '')
      )
      AND (
        derniere_notification_date IS NULL
        OR derniere_notification_date < CURDATE()
      )
      ORDER BY date_fin ASC
    `;

    db.query(sql, async (err, results) => {
      if (err) {
        console.error("Erreur recherche clients :", err);
        return;
      }

      console.log("Clients à notifier :", results.length);

      for (const client of results) {
        const joursRestants = Math.max(
          0,
          Math.ceil(
            (new Date(client.date_fin) - new Date()) /
              (1000 * 60 * 60 * 24)
          )
        );

        let notificationEnvoyee = false;

        try {
          if (client.email && client.email.trim() !== "") {
            await envoyerEmail(
              client.email,
              client.nom,
              client.date_fin,
              joursRestants
            );

            notificationEnvoyee = true;

            console.log(
              `Email envoyé à ${client.nom} : J-${joursRestants}`
            );
          }

          if (
            client.telephone &&
            client.telephone.trim() !== "" &&
            process.env.TWILIO_ACCOUNT_SID &&
            process.env.TWILIO_AUTH_TOKEN &&
            process.env.TWILIO_PHONE_NUMBER
          ) {
            await envoyerSMSExpiration(
              client.telephone,
              client.nom,
              client.date_fin,
              joursRestants
            );

            notificationEnvoyee = true;

            console.log(
              `SMS envoyé à ${client.nom} : J-${joursRestants}`
            );
          }

          if (notificationEnvoyee) {
            db.query(
              `
                UPDATE clients
                SET derniere_notification_date = CURDATE()
                WHERE id = ?
              `,
              [client.id],
              (updateErr) => {
                if (updateErr) {
                  console.error(
                    "Erreur mise à jour notification :",
                    updateErr
                  );
                }
              }
            );
          }
        } catch (error) {
          console.error(
            `Erreur notification pour ${client.nom} :`,
            error.message
          );
        }
      }
    });
  },
  {
    timezone: "America/Toronto"
  }
);/* NOTIFICATION ABONNEMENT IPTV */

console.log("Cron IPTV chargé");

cron.schedule(
  "0 9 * * *",
  () => {
    console.log("Vérification des abonnements IPTV");

    const sql = `
      SELECT *
      FROM clients
      WHERE DATEDIFF(date_fin, CURDATE()) BETWEEN 0 AND 7
      AND statut = 'actif'
      AND (
        (email IS NOT NULL AND TRIM(email) <> '')
        OR
        (telephone IS NOT NULL AND TRIM(telephone) <> '')
      )
      AND (
        derniere_notification_date IS NULL
        OR derniere_notification_date < CURDATE()
      )
      ORDER BY date_fin ASC
    `;

    db.query(sql, async (err, results) => {
      if (err) {
        console.error("Erreur recherche clients :", err);
        return;
      }

      console.log("Clients à notifier :", results.length);

      for (const client of results) {
        const joursRestants = Math.max(
          0,
          Math.ceil(
            (new Date(client.date_fin) - new Date()) /
              (1000 * 60 * 60 * 24)
          )
        );

        let notificationEnvoyee = false;

        try {
          if (client.email && client.email.trim() !== "") {
            await envoyerEmail(
              client.email,
              client.nom,
              client.date_fin,
              joursRestants
            );

            notificationEnvoyee = true;

            console.log(
              `Email envoyé à ${client.nom} : J-${joursRestants}`
            );
          }

          if (
            client.telephone &&
            client.telephone.trim() !== "" &&
            process.env.TWILIO_ACCOUNT_SID &&
            process.env.TWILIO_AUTH_TOKEN &&
            process.env.TWILIO_PHONE_NUMBER
          ) {
            await envoyerSMSExpiration(
              client.telephone,
              client.nom,
              client.date_fin,
              joursRestants
            );

            notificationEnvoyee = true;

            console.log(
              `SMS envoyé à ${client.nom} : J-${joursRestants}`
            );
          }

          if (notificationEnvoyee) {
            db.query(
              `
                UPDATE clients
                SET derniere_notification_date = CURDATE()
                WHERE id = ?
              `,
              [client.id],
              (updateErr) => {
                if (updateErr) {
                  console.error(
                    "Erreur mise à jour notification :",
                    updateErr
                  );
                }
              }
            );
          }
        } catch (error) {
          console.error(
            `Erreur notification pour ${client.nom} :`,
            error.message
          );
        }
      }
    });
  },
  {
    timezone: "America/Toronto"
  }
);

cron.schedule("* * * * *", () => {
const sql = `
SELECT
id,
nom,
email,
statut,
date_fin,
DATEDIFF(date_fin, CURDATE()) AS jours
FROM clients
ORDER BY jours ASC
LIMIT 10
`;


  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    results.forEach((rdv) => {
      envoyerEmailRappelRendezVous(
  rdv.email,
  rdv.nom,
  rdv.type_rdv,
  rdv.date_rdv,
  rdv.heure_rdv
);

      db.query(
        "UPDATE rendez_vous SET rappel_envoye = 1 WHERE id = ?",
        [rdv.id]
      );
    });
  });
});
/* DEMARRAGE SERVEUR */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);

  db.query(
    `
      SELECT
        DATABASE() AS database_name,
        COUNT(*) AS total_clients
      FROM clients
    `,
    (err, results) => {
      if (err) {
        console.error("Erreur vérification base :", err);
        return;
      }

      console.log("DATABASE =", results[0].database_name);
      console.log("TOTAL CLIENTS =", results[0].total_clients);
    }
  );
});
app.get("/test-email", async (req, res) => {
  try {
    await envoyerEmail(
      "choukri.bzd@gmail.com",
      "Ahmed"
    );

    res.send("Email envoyé avec succès");
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur email");
  }
});
app.get("/test-sms", async (req, res) => {
  try {
    await envoyerSMSExpiration(
      "+14385318589",
      "Ahmed",
      "2026-08-11"
    );

    res.send("SMS envoyé avec succès");
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur SMS");
  }
});