<template>
  <div class="page">
    <div class="card">
      <h1>Nouvelle réparation</h1>
      <p>Création par l’admin après dépôt de l’appareil au magasin.</p>

      <input v-model="form.nom" placeholder="Nom du client">
      <input v-model="form.email" placeholder="Email">
      <input v-model="form.telephone" placeholder="Téléphone">

      <select v-model="form.appareil">
        <option value="">Choisir appareil</option>
        <option>iPhone</option>
        <option>Samsung</option>
        <option>Google Pixel</option>
        <option>Huawei</option>
        <option>Xiaomi</option>
        <option>Autre</option>
      </select>

      <textarea v-model="form.probleme" placeholder="Problème de l’appareil"></textarea>

      <input v-model="form.prix" type="number" placeholder="Prix estimé">

      <select v-model="form.statut">
        <option>reçu au magasin</option>
        <option>diagnostic</option>
        <option>en réparation</option>
        <option>prêt à récupérer</option>
        <option>livré</option>
      </select>

      <button @click="creerReparation">
        Créer réparation
      </button>

      <p v-if="message" class="message">{{ message }}</p>

      <router-link class="back" to="/admin#reparations">
        Retour dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const message = ref("");

const form = reactive({
  nom: "",
  email: "",
  telephone: "",
  appareil: "",
  probleme: "",
  prix: "",
  statut: "reçu au magasin"
});

const creerReparation = async () => {
  if (!form.nom || !form.email || !form.telephone || !form.appareil || !form.probleme) {
    message.value = "Veuillez remplir tous les champs obligatoires.";
    return;
  }

  try {
    await axios.post("https://mobile-et-plus.onrender.com/api/reparations", {
      nom: form.nom,
      email: form.email,
      telephone: form.telephone,
      appareil: form.appareil,
      probleme: form.probleme,
      prix: form.prix,
      statut: form.statut
    });

    message.value = "Réparation créée avec succès.";

    setTimeout(() => {
      router.push("/admin#reparations");
    }, 1200);

  } catch (error) {
    console.log(error);
    message.value = "Erreur création réparation.";
  }
};
</script>

<style scoped>
.page{
  min-height:100vh;
  background:linear-gradient(135deg,#050505,#111827,#1f2937);
  display:flex;
  justify-content:center;
  align-items:center;
  padding:40px;
  color:white;
  font-family:Arial,sans-serif;
}

.card{
  width:650px;
  background:#111827;
  border:1px solid rgba(255,122,0,.35);
  border-radius:30px;
  padding:45px;
  box-shadow:0 0 40px rgba(255,122,0,.25);
  display:flex;
  flex-direction:column;
  gap:18px;
}

h1{
  color:#ff7a00;
  font-size:42px;
  text-align:center;
}

p{
  color:#d1d5db;
  text-align:center;
}

input,
select,
textarea{
  padding:17px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.15);
  background:#050505;
  color:white;
  font-size:16px;
  outline:none;
}

textarea{
  height:130px;
  resize:none;
}

input:focus,
select:focus,
textarea:focus{
  border-color:#ff7a00;
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

.message{
  color:#ff7a00;
  font-weight:bold;
}

.back{
  color:#ff7a00;
  text-align:center;
  text-decoration:none;
  font-weight:bold;
}
</style>