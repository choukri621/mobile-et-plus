const nodemailer = require("nodemailer");
const twilio = require("twilio");

let twilioClient = null;

if (
  process.env.TWILIO_ACCOUNT_SID &&
  process.env.TWILIO_ACCOUNT_SID.startsWith("AC")
) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* EMAIL IPTV */

const envoyerEmail = async (
  email,
  nom,
  dateFin,
  joursRestants
) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Expiration abonnement IPTV",
      html: `
        <h2>Bonjour ${nom}</h2>

       <p>
Votre abonnement IPTV expire dans
<b>${joursRestants} jour(s)</b>.
</p>

<p>
Date de fin :
<b>${dateFin}</b>
</p>

<p>
Merci de passer au magasin Mobile et Plus afin de renouveler votre abonnement.
</p>

        <p>
          Prix du renouvellement :
          <strong>80$ / année</strong>
        </p>

        <p>
          Veuillez prendre rendez-vous pour venir payer
          directement au magasin.
        </p>

        <br>

        <p>
          Merci,<br>
          Mobile et Plus
        </p>
      `
    });

    console.log(`Email IPTV envoyé à ${email}`);

  } catch (error) {

    console.log("Erreur email IPTV :", error);

  }
};

/* EMAIL REPARATION */

const envoyerEmailReparation = async (
  email,
  nom,
  trackingCode,
  appareil
) => {

  try {

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Votre appareil est prêt",
      html: `
        <h2>Bonjour ${nom}</h2>

        <p>
          Votre appareil est maintenant prêt
          à être récupéré chez Mobile et Plus.
        </p>

        <p>
          <strong>Appareil :</strong>
          ${appareil}
        </p>

        <p>
          <strong>Numéro de suivi :</strong>
          ${trackingCode}
        </p>

        <p>
          Vous pouvez passer au magasin
          durant les heures d'ouverture.
        </p>

        <br>

        <p>
          Merci,<br>
          Mobile et Plus
        </p>
      `
    });

    console.log(
      `Email réparation envoyé à ${email}`
    );

  } catch (error) {

    console.log(
      "Erreur email réparation :",
      error
    );

  }
};
const envoyerEmailRendezVous = async (
  email,
  nom,
  type,
  date,
  heure
) => {

  try {

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmation de votre rendez-vous",

      html: `
      <h2>Bonjour ${nom},</h2>

      <p>
      Votre rendez-vous a bien été enregistré.
      </p>

      <hr>

      <p><strong>Type :</strong> ${type}</p>

      <p><strong>Date :</strong> ${date}</p>

      <p><strong>Heure :</strong> ${heure}</p>

      <hr>

      <p>
      Merci de vous présenter 5 minutes avant votre rendez-vous.
      </p>

      <p>
      Mobile et Plus
      </p>
      `
    });

    console.log("Email rendez-vous envoyé");

  } catch (err) {

    console.log(err);

  }

};
const envoyerEmailRappelRendezVous = async (email, nom, type, date, heure) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Rappel : votre rendez-vous est dans 1 heure",
      html: `
        <h2>Bonjour ${nom},</h2>
        <p>Petit rappel : votre rendez-vous est prévu dans moins d'une heure.</p>
        <p><strong>Type :</strong> ${type}</p>
        <p><strong>Date :</strong> ${date}</p>
        <p><strong>Heure :</strong> ${heure}</p>
        <p>Merci de vous présenter 5 minutes avant.</p>
        <p>Mobile et Plus</p>
      `
    });

    console.log("Email rappel rendez-vous envoyé");
  } catch (error) {
    console.log("Erreur email rappel :", error);
  }
};
const envoyerSMSExpiration = async (
  telephone,
  nom,
  dateFin,
  joursRestants
) => {
  try {
    if (!telephone) return;

    const texteExpiration =
      joursRestants === 0
        ? "expire aujourd’hui"
        : `expire dans ${joursRestants} jour(s)`;

    await twilioClient.messages.create({
      body:
        `Bonjour ${nom}, votre abonnement IPTV ${texteExpiration} ` +
        `(${dateFin}). Merci de renouveler. Mobile et Plus`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: telephone
    });

    console.log(`SMS envoyé à ${telephone}`);
  } catch (error) {
    console.log("Erreur SMS :", error.message);
  }
};
module.exports = {
  envoyerEmail,
  envoyerEmailReparation,
  envoyerEmailRendezVous,
  envoyerEmailRappelRendezVous,
  envoyerSMSExpiration
};