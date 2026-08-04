<template>
  <div class="appointment-page">
    <div class="appointment-card">
      <div class="left">
        <div class="logo">📺 Mobile et <span>Plus</span></div>

        <h1>Prendre un rendez-vous</h1>

        <p>
          Réservez un rendez-vous pour choisir votre serveur IPTV,
          faire une réparation téléphone ou obtenir du support technique.
        </p>

        <div class="info-box">
          <h3>📡 Serveurs IPTV disponibles</h3>
          <p>Atlas Pro</p>
          <p>BoxyHD</p>
          <p>OTT Platinium</p>
          <p>Smart IPTV</p>
        </div>

        <div class="info-box">
          <h3>🕒 Horaire du magasin</h3>
          <p>Mardi à samedi : 11:00 à 18:00</p>
          <p>Dimanche et lundi : fermé</p>
        </div>

        <div class="info-box">
          <h3>💵 Prix</h3>
          <p>Les prix varient selon le serveur IPTV choisi.</p>
          <p>Le prix est confirmé directement au magasin.</p>
        </div>
      </div>

      <div class="form">
        <h2>Réservation</h2>

        <input v-model="form.nom" type="text" placeholder="Nom complet" readonly>
        <input v-model="form.email" type="email" placeholder="Email" readonly>
        <input v-model="form.telephone" type="text" placeholder="Téléphone" readonly>

        <select v-model="form.type_rdv">
          <option value="">Type de rendez-vous</option>
          <option>Activation abonnement IPTV</option>
          <option>Renouvellement abonnement IPTV</option>
          <option>Support technique IPTV</option>
          <option>Dépôt réparation téléphone</option>
          <option>Diagnostic téléphone</option>
        </select>

        <select v-model="form.serveur_iptv">
          <option value="">Choisir serveur IPTV</option>
          <option>Atlas Pro</option>
          <option>BoxyHD</option>
          <option>OTT Platinium</option>
          <option>Smart IPTV</option>
        </select>

        <input v-model="form.date_rdv" type="date">

        <div class="hours">
          <button
            v-for="hour in heures"
            :key="hour"
            :class="{ active: form.heure_rdv === hour }"
            @click="form.heure_rdv = hour"
            type="button"
          >
            {{ hour }}
          </button>
        </div>

        <textarea
          v-model="form.message"
          placeholder="Message optionnel"
        ></textarea>

        <button class="submit-btn" @click="reserver">
          Réserver maintenant
        </button>

        <p v-if="message" class="message">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const message = ref("");

const heures = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00"
];

const form = reactive({
  nom: "",
  email: "",
  telephone: "",
  type_rdv: "",
  serveur_iptv: "",
  date_rdv: "",
  heure_rdv: "",
  message: ""
});

onMounted(() => {
  const client = JSON.parse(localStorage.getItem("client"));

  if (client) {
    form.nom = client.nom || "";
    form.email = client.email || "";
    form.telephone = client.telephone || "";
  }
});

const reserver = async () => {
  if (!form.nom || !form.email || !form.telephone) {
    message.value = "Veuillez vous connecter avant de réserver.";
    return;
  }

  if (!form.type_rdv || !form.date_rdv || !form.heure_rdv) {
    message.value = "Veuillez remplir tous les champs obligatoires.";
    return;
  }

  if (form.type_rdv.includes("IPTV") && !form.serveur_iptv) {
    message.value = "Veuillez choisir un serveur IPTV.";
    return;
  }

  try {
    await axios.post("http://localhost:3000/api/rendez-vous", form);

    message.value = "Rendez-vous réservé avec succès.";

    form.type_rdv = "";
    form.serveur_iptv = "";
    form.date_rdv = "";
    form.heure_rdv = "";
    form.message = "";
    } catch (error) {
    console.log(error);

    message.value =
      error.response?.data?.message ||
      "Ce créneau n'est pas disponible. Choisissez une autre heure.";
  }
};
</script>

<style scoped>
*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif}

.appointment-page{
  min-height:100vh;
  background:linear-gradient(135deg,#050505,#111827,#1f2937);
  display:flex;
  justify-content:center;
  align-items:center;
  padding:40px;
  color:white;
}

.appointment-card{
  width:1250px;
  background:#111827;
  border:1px solid rgba(255,122,0,.25);
  border-radius:30px;
  overflow:hidden;
  display:grid;
  grid-template-columns:1fr 1fr;
  box-shadow:0 0 45px rgba(255,122,0,.25);
}

.left{
  background:#050505;
  padding:60px;
}

.logo{
  font-size:30px;
  font-weight:900;
  margin-bottom:50px;
}

.logo span{color:#ff7a00}

.left h1{
  font-size:55px;
  line-height:1.15;
  margin-bottom:30px;
}

.left p{
  color:#d1d5db;
  font-size:20px;
  line-height:1.7;
  margin-bottom:12px;
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
  margin-bottom:12px;
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
  font-size:42px;
  color:#ff7a00;
  margin-bottom:10px;
}

input,select,textarea{
  width:100%;
  padding:17px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.15);
  background:#050505;
  color:white;
  font-size:16px;
  outline:none;
}

input:focus,select:focus,textarea:focus{
  border-color:#ff7a00;
}

input[readonly]{
  opacity:.8;
}

textarea{
  height:120px;
  resize:none;
}

.hours{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:12px;
}

.hours button{
  padding:14px;
  border-radius:12px;
  border:1px solid rgba(255,122,0,.4);
  background:#1f2937;
  color:white;
  font-weight:bold;
  cursor:pointer;
}

.hours button.active{
  background:#ff7a00;
}

.submit-btn{
  padding:18px;
  border:none;
  border-radius:15px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  font-size:18px;
  font-weight:bold;
  cursor:pointer;
}

.message{
  color:#ff7a00;
  text-align:center;
  font-weight:bold;
}

@media(max-width:900px){
  .appointment-card{
    grid-template-columns:1fr;
  }

  .left,.form{
    padding:35px;
  }

  .left h1{
    font-size:38px;
  }

  .hours{
    grid-template-columns:1fr 1fr;
  }
}
</style>