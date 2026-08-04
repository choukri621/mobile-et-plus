<template>
  <div class="track-page">
    <div class="track-card">
      <h1>Suivi de réparation</h1>
      <p>Entrez votre numéro de suivi pour voir l’état de votre réparation.</p>

      <div class="search-box">
        <input
          v-model="trackingCode"
          placeholder="Ex: REP-1748881234567"
        />

        <button @click="chercherReparation">
          Rechercher
        </button>
      </div>

      <p v-if="message" class="message">{{ message }}</p>

      <div v-if="reparation" class="result">
        <h2>Réparation trouvée</h2>

        <div class="info">
          <span>Nom</span>
          <strong>{{ reparation.nom }}</strong>
        </div>

        <div class="info">
          <span>Appareil</span>
          <strong>{{ reparation.appareil }}</strong>
        </div>

        <div class="info">
          <span>Problème</span>
          <strong>{{ reparation.probleme }}</strong>
        </div>

        <div class="info">
          <span>Date rendez-vous</span>
          <strong>{{ formatDate(reparation.date_rdv) }}</strong>
        </div>

        <div class="info">
          <span>Heure</span>
          <strong>{{ reparation.heure_rdv }}</strong>
        </div>

        <div class="status">
          Statut : {{ reparation.statut }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const trackingCode = ref("");
const reparation = ref(null);
const message = ref("");

const chercherReparation = async () => {
  if (!trackingCode.value) {
    message.value = "Veuillez entrer un numéro de suivi.";
    reparation.value = null;
    return;
  }

  try {
    const res = await axios.get(
      `https://mobile-et-plus.onrender.com/api/reparations/track/${trackingCode.value}`
    );

    reparation.value = res.data;
    message.value = "";
  } catch (error) {
    reparation.value = null;
    message.value = "Aucune réparation trouvée avec ce numéro.";
  }
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-CA");
};
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

.track-page{
  min-height:100vh;
  background:linear-gradient(135deg,#050505,#111827,#1f2937);
  display:flex;
  justify-content:center;
  align-items:center;
  padding:40px;
  color:white;
}

.track-card{
  width:850px;
  background:#111827;
  border:1px solid rgba(255,122,0,.3);
  border-radius:30px;
  padding:50px;
  box-shadow:0 0 45px rgba(255,122,0,.25);
}

h1{
  font-size:48px;
  color:#ff7a00;
  margin-bottom:15px;
  text-align:center;
}

p{
  color:#d1d5db;
  font-size:19px;
  text-align:center;
  margin-bottom:30px;
}

.search-box{
  display:flex;
  gap:15px;
  margin-bottom:25px;
}

input{
  flex:1;
  padding:18px;
  border-radius:15px;
  border:1px solid rgba(255,255,255,.15);
  background:#050505;
  color:white;
  font-size:17px;
  outline:none;
}

input:focus{
  border-color:#ff7a00;
}

button{
  padding:18px 30px;
  border:none;
  border-radius:15px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  font-size:17px;
  font-weight:bold;
  cursor:pointer;
}

.message{
  color:#ff7a00;
  font-weight:bold;
}

.result{
  margin-top:30px;
  background:#050505;
  border-radius:25px;
  padding:30px;
  border:1px solid rgba(255,122,0,.25);
}

.result h2{
  color:#ff7a00;
  margin-bottom:25px;
}

.info{
  display:flex;
  justify-content:space-between;
  gap:20px;
  padding:15px 0;
  border-bottom:1px solid rgba(255,255,255,.08);
}

.info span{
  color:#9ca3af;
}

.info strong{
  color:white;
  text-align:right;
}

.status{
  margin-top:25px;
  background:#ff7a00;
  color:white;
  padding:18px;
  border-radius:15px;
  text-align:center;
  font-weight:bold;
  font-size:20px;
}

@media(max-width:800px){
  .search-box{
    flex-direction:column;
  }

  .track-card{
    padding:30px;
  }

  h1{
    font-size:36px;
  }

  .info{
    flex-direction:column;
  }
}
</style>