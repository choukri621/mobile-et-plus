<template>
  <div class="page">
    <div class="card">
      <h1>Importer BoxyHD</h1>
      <p>Colle ici le JSON complet de BoxyHD.</p>

      <textarea
        v-model="jsonText"
        placeholder="Collez ici le JSON BoxyHD..."
      ></textarea>

      <button @click="importerBoxy">
        Importer les clients BoxyHD
      </button>

      <p v-if="message" class="message">{{ message }}</p>

      <router-link class="back" to="/admin">
        Retour dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const jsonText = ref("");
const message = ref("");

const importerBoxy = async () => {
  if (!jsonText.value) {
    message.value = "Collez le JSON BoxyHD d'abord.";
    return;
  }

  try {
    const data = JSON.parse(jsonText.value);

    const res = await axios.post(
      "http://localhost:3000/api/import-boxy",
      data
    );

    message.value =
      `${res.data.importes} clients importés sur ${res.data.total}. Erreurs : ${res.data.erreurs}`;

    jsonText.value = "";
  } catch (error) {
    console.log(error);
    message.value = "JSON invalide ou erreur import.";
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
  color:white;
  padding:40px;
  font-family:Arial,sans-serif;
}

.card{
  width:900px;
  background:#111827;
  border:1px solid rgba(255,122,0,.35);
  border-radius:30px;
  padding:40px;
  box-shadow:0 0 40px rgba(255,122,0,.25);
}

h1{
  color:#ff7a00;
  text-align:center;
  margin-bottom:15px;
}

p{
  text-align:center;
  color:#d1d5db;
  margin-bottom:20px;
}

textarea{
  width:100%;
  height:420px;
  background:#050505;
  color:white;
  border:1px solid rgba(255,255,255,.2);
  border-radius:18px;
  padding:20px;
  font-size:15px;
  outline:none;
  resize:none;
}

textarea:focus{
  border-color:#ff7a00;
}

button{
  width:100%;
  margin-top:20px;
  padding:18px;
  border:none;
  border-radius:15px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  font-weight:bold;
  font-size:18px;
  cursor:pointer;
}

.message{
  color:#ff7a00;
  font-weight:bold;
  margin-top:20px;
}

.back{
  display:block;
  text-align:center;
  margin-top:20px;
  color:#ff7a00;
  font-weight:bold;
  text-decoration:none;
}
</style>