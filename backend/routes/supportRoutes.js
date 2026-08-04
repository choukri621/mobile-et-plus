const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { envoyerEmail } = require("../services/emailService");
router.post("/", (req, res) => {

const {
client_id,
nom,
email,
telephone,
sujet,
priorite,
message,
ticket_code,
fichier
} = req.body;

db.query(
`INSERT INTO support
(client_id,nom,email,telephone,sujet,priorite,message,ticket_code,fichier)
VALUES(?,?,?,?,?,?,?,?,?)`,
[
client_id,
nom,
email,
telephone,
sujet,
priorite,
message,
ticket_code,
fichier
],
(err,result)=>{

if(err){
console.log(err);
return res.status(500).json(err);
}
db.query(
  `INSERT INTO notifications (client_email, titre, message)
   VALUES (?, ?, ?)`,
  [
    email,
    "Demande support reçue",
    `Votre demande support ${ticket_code} a été reçue. Notre équipe va vous répondre.`
  ]
);
db.query(
  `INSERT INTO admin_notifications (titre, message, type)
   VALUES (?, ?, ?)`,
  [
    "Nouveau ticket support",
    `${nom} a envoyé une demande support : ${sujet}.`,
    "support"
  ]
);

envoyerEmail(
  email,
  "Demande support reçue - Mobile et Plus",
  `Bonjour ${nom},

Votre demande support a été reçue.

Ticket : ${ticket_code}
Sujet : ${sujet}
Priorité : ${priorite}

Notre équipe vous répondra rapidement.

Merci,
Mobile et Plus`
);
res.json({
message:"Support envoyé"
});

});

});

router.get("/",(req,res)=>{

db.query(
"SELECT * FROM support ORDER BY created_at DESC",
(err,result)=>{

if(err) return res.status(500).json(err);

res.json(result);

});

});

router.put("/:id",(req,res)=>{

db.query(
"UPDATE support SET statut=? WHERE id=?",
[
req.body.statut,
req.params.id
],
(err)=>{

if(err) return res.status(500).json(err);

res.json({
message:"Statut modifié"
});

});

});

router.delete("/:id",(req,res)=>{

db.query(
"DELETE FROM support WHERE id=?",
[req.params.id],
(err)=>{

if(err) return res.status(500).json(err);

res.json({
message:"Supprimé"
});

});

});

module.exports=router;