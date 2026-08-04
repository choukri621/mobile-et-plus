<template>
  <div class="support-page">
    <div class="support-card">
      <div class="left">
        <h1>Centre d’assistance</h1>

        <p>
          Besoin d’aide pour IPTV, réparation, rendez-vous ou suivi ?
          Envoyez une demande et notre équipe vous répondra rapidement.
        </p>

        <div class="info-box">
          <h3>📞 Téléphone</h3>
          <p>514-543-4741</p>
          <p>450-540-9733</p>
        </div>

        <div class="info-box">
          <h3>✉️ Email</h3>
          <p>mobileetplus@gmail.com</p>
        </div>

        <div class="info-box">
          <h3>🕒 Horaire</h3>
          <p>Mardi - Samedi : 11h00 à 18h00</p>
          <p>Dimanche - Lundi : fermé</p>
        </div>
      </div>

      <div class="form">
        <h2>Envoyer une demande</h2>

        <div class="client-box" v-if="client">
          <p>👤 {{ client.nom }}</p>
          <p>📧 {{ client.email }}</p>
          <p>📱 {{ client.telephone }}</p>
        </div>

        <select v-model="form.sujet">
          <option value="">Sujet de la demande</option>
          <option>IPTV</option>
          <option>Réparation</option>
          <option>Rendez-vous</option>
          <option>Suivi réparation</option>
          <option>Facturation</option>
          <option>Autre</option>
        </select>

        <select v-model="form.priorite">
          <option value="">Priorité</option>
          <option>Faible</option>
          <option>Normale</option>
          <option>Urgente</option>
        </select>

        <textarea
          v-model="form.message"
          placeholder="Décrivez votre problème"
        ></textarea>

        <button @click="envoyerSupport">
          Envoyer la demande
        </button>

        <div v-if="ticket" class="success-card">
          <h3>✅ Demande envoyée</h3>
          <p>Numéro de ticket :</p>
          <strong>{{ ticket }}</strong>
          <p>Vous recevrez une notification dans votre compte.</p>
        </div>

        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const client = ref(null);
const message = ref("");
const ticket = ref("");

const form = reactive({
  sujet: "",
  priorite: "",
  message: ""
});

onMounted(() => {
  const savedClient = localStorage.getItem("client");

  if (savedClient) {
    client.value = JSON.parse(savedClient);
  }
});

const envoyerSupport = async () => {
  if (!client.value) {
    message.value = "Veuillez vous connecter avant d'envoyer une demande.";
    return;
  }

  if (!form.sujet || !form.priorite || !form.message) {
    message.value = "Veuillez remplir tous les champs obligatoires.";
    return;
  }

  try {
    const ticketCode =
      "SUP-" +
      new Date().toISOString().slice(0, 10).replaceAll("-", "") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    await axios.post("https://mobile-et-plus.onrender.com/api/support", {
      nom: client.value.nom,
      email: client.value.email,
      telephone: client.value.telephone,
      sujet: form.sujet,
      priorite: form.priorite,
      message: form.message,
      ticket_code: ticketCode,
      fichier: null
    });

    ticket.value = ticketCode;
    message.value = "";

    form.sujet = "";
    form.priorite = "";
    form.message = "";
  } catch (error) {
    console.log(error);
    message.value =
      error.response?.data?.message ||
      "Erreur lors de l'envoi de la demande.";
  }
};
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

.support-page{
  min-height:100vh;
  background:linear-gradient(135deg,#050505,#111827,#1f2937);
  display:flex;
  justify-content:center;
  align-items:center;
  padding:50px;
  color:white;
}

.support-card{
  width:1200px;
  display:grid;
  grid-template-columns:1fr 1fr;
  background:#111827;
  border:1px solid rgba(255,122,0,.3);
  border-radius:30px;
  overflow:hidden;
  box-shadow:0 0 45px rgba(255,122,0,.25);
}

.left{
  background:#050505;
  padding:60px;
}

.left h1{
  font-size:55px;
  line-height:1.15;
  margin-bottom:25px;
}

.left p{
  color:#d1d5db;
  font-size:20px;
  line-height:1.6;
  margin-bottom:25px;
}

.info-box{
  background:#111827;
  border-left:5px solid #ff7a00;
  padding:22px;
  border-radius:18px;
  margin-bottom:20px;
}

.info-box h3{
  color:#ff7a00;
  margin-bottom:10px;
}

.info-box p{
  margin:8px 0;
  font-size:17px;
}

.form{
  padding:55px;
  display:flex;
  flex-direction:column;
  gap:18px;
}

.form h2{
  color:#ff7a00;
  font-size:40px;
  margin-bottom:10px;
}

.client-box{
  background:#050505;
  border:1px solid rgba(255,122,0,.3);
  border-radius:18px;
  padding:18px;
}

.client-box p{
  margin:7px 0;
  color:#d1d5db;
}

select,
textarea,
input{
  width:100%;
  padding:17px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.15);
  background:#050505;
  color:white;
  font-size:16px;
  outline:none;
}

select:focus,
textarea:focus,
input:focus{
  border-color:#ff7a00;
}

textarea{
  height:150px;
  resize:none;
}

button{
  padding:18px;
  border:none;
  border-radius:15px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  font-size:18px;
  font-weight:bold;
  cursor:pointer;
}

.success-card{
  background:#050505;
  border-left:5px solid #22c55e;
  border-radius:18px;
  padding:22px;
  text-align:center;
}

.success-card h3{
  color:#22c55e;
  margin-bottom:10px;
}

.success-card strong{
  display:block;
  color:#ff7a00;
  font-size:25px;
  margin:10px 0;
}

.message{
  color:#ff7a00;
  text-align:center;
  font-weight:bold;
}

@media(max-width:900px){
  .support-card{
    grid-template-columns:1fr;
  }

  .support-page{
    padding:25px;
  }

  .left,
  .form{
    padding:35px;
  }

  .left h1{
    font-size:40px;
  }
}
</style>