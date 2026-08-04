<template>
  <div class="appointment-page">
    <div class="appointment-card">

      <div class="left">
        <div class="logo">📺 Mobile et <span>Plus</span></div>

        <h1>Prendre un rendez-vous</h1>

        <p>
          Choisissez une date et une heure disponible.
          Ouvert du mardi au samedi de 11h à 19h.
        </p>

        <div class="info-box">
          <h3>🕒 Horaire</h3>
          <p>Mardi - Samedi : 11:00 à 19:00</p>
          <p>Dimanche - Lundi : Fermé</p>
        </div>
      </div>

      <div class="form">
        <h2>Réservation</h2>

        <input v-model="nom" type="text" placeholder="Nom complet">
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="telephone" type="text" placeholder="Téléphone">

        <select v-model="typeRdv">
          <option value="">Type de rendez-vous</option>
          <option>Installation IPTV</option>
          <option>Support technique</option>
          <option>Renouvellement abonnement</option>
        </select>

        <input v-model="dateRdv" type="date" @change="genererHeures">

        <p class="closed" v-if="messageFermeture">
          {{ messageFermeture }}
        </p>

        <div class="hours" v-if="heuresDisponibles.length > 0">
          <button
            v-for="heure in heuresDisponibles"
            :key="heure"
            :class="heureChoisie === heure ? 'hour active' : 'hour'"
            @click="heureChoisie = heure"
          >
            {{ heure }}
          </button>
        </div>

        <textarea v-model="message" placeholder="Message optionnel"></textarea>

        <button class="reserve" @click="reserver">
          Réserver maintenant
        </button>

        <p class="success" v-if="confirmation">
          {{ confirmation }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nom = ref('')
const email = ref('')
const telephone = ref('')
const typeRdv = ref('')
const dateRdv = ref('')
const heureChoisie = ref('')
const message = ref('')
const messageFermeture = ref('')
const confirmation = ref('')

const heuresDisponibles = ref([])

const genererHeures = () => {
  heuresDisponibles.value = []
  heureChoisie.value = ''
  messageFermeture.value = ''
  confirmation.value = ''

  if (!dateRdv.value) return

  const date = new Date(dateRdv.value + 'T00:00:00')
  const jour = date.getDay()

  // 0 = dimanche, 1 = lundi
  if (jour === 0 || jour === 1) {
    messageFermeture.value = 'Le magasin est fermé dimanche et lundi.'
    return
  }

  // Mardi à samedi : 11h à 19h
  heuresDisponibles.value = [
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00'
  ]
}

const reserver = () => {
  if (!nom.value || !email.value || !telephone.value || !typeRdv.value || !dateRdv.value || !heureChoisie.value) {
    confirmation.value = 'Veuillez remplir tous les champs et choisir une heure.'
    return
  }

  confirmation.value = `Rendez-vous réservé le ${dateRdv.value} à ${heureChoisie.value}.`
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

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
  width:1200px;
  background:#111827;
  border:1px solid rgba(255,122,0,.25);
  border-radius:30px;
  overflow:hidden;
  display:grid;
  grid-template-columns:1fr 1fr;
  box-shadow:0 0 45px rgba(255,122,0,.25);
}

.left{
  padding:60px;
  background:#050505;
}

.logo{
  font-size:28px;
  font-weight:900;
  margin-bottom:45px;
}

.logo span{
  color:#ff7a00;
}

.left h1{
  font-size:50px;
  line-height:1.2;
  margin-bottom:25px;
}

.left p{
  color:#d1d5db;
  font-size:20px;
  line-height:1.7;
  margin-bottom:35px;
}

.info-box{
  background:#111827;
  border-left:5px solid #ff7a00;
  padding:25px;
  border-radius:18px;
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
  font-size:38px;
  color:#ff7a00;
  margin-bottom:10px;
}

input,
select,
textarea{
  width:100%;
  padding:17px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.15);
  background:#050505;
  color:white;
  font-size:16px;
  outline:none;
}

input:focus,
select:focus,
textarea:focus{
  border-color:#ff7a00;
}

textarea{
  height:100px;
  resize:none;
}

.hours{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:10px;
}

.hour{
  background:#1f2937;
  color:white;
  border:1px solid rgba(255,122,0,.4);
  padding:12px;
  border-radius:12px;
  cursor:pointer;
  font-weight:bold;
}

.hour.active{
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
}

.reserve{
  padding:18px;
  border:none;
  border-radius:15px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  font-size:18px;
  font-weight:bold;
  cursor:pointer;
  transition:.3s;
}

.reserve:hover{
  transform:translateY(-5px);
  box-shadow:0 0 25px rgba(255,122,0,.6);
}

.closed{
  color:#ff7a00;
  font-weight:bold;
}

.success{
  color:#ff7a00;
  font-weight:bold;
  text-align:center;
}

@media(max-width:900px){
  .appointment-card{
    grid-template-columns:1fr;
  }

  .left,
  .form{
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