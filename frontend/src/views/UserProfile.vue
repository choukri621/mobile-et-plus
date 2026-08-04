<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="left">
        <div class="avatar">👤</div>

        <h1>{{ form.nom || "Client" }}</h1>

        <p>Client Mobile et Plus</p>

        <router-link class="back-btn" to="/">
          Retour accueil
        </router-link>
      </div>

      <div class="right">
        <h2>Mon profil</h2>

        <input v-model="form.nom" type="text" placeholder="Nom complet">
        <input v-model="form.email" type="email" placeholder="Email">
        <input v-model="form.telephone" type="text" placeholder="Téléphone">
        <input v-model="form.ville" type="text" placeholder="Ville">

        <button class="save" @click="sauvegarder">
          Sauvegarder
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

const message = ref("");

const form = reactive({
  id: "",
  nom: "",
  email: "",
  telephone: "",
  ville: "Montréal, Canada"
});

onMounted(() => {
  const client = JSON.parse(localStorage.getItem("client"));

  if (client) {
    form.id = client.id || "";
    form.nom = client.nom || "";
    form.email = client.email || "";
    form.telephone = client.telephone || "";
  }
});

const sauvegarder = () => {
  localStorage.setItem("client", JSON.stringify({
    id: form.id,
    nom: form.nom,
    email: form.email,
    telephone: form.telephone
  }));

  message.value = "Profil sauvegardé localement.";
};
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

.profile-page{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:40px;
  background:linear-gradient(135deg,#111827,#1f2937);
}

.profile-card{
  width:1100px;
  background:#1e293b;
  border-radius:30px;
  display:grid;
  grid-template-columns:350px 1fr;
  overflow:hidden;
  box-shadow:0 0 40px rgba(255,122,0,.2);
}

.left{
  padding:50px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  background:#0f172a;
  color:white;
}

.avatar{
  width:150px;
  height:150px;
  border-radius:50%;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:60px;
  margin-bottom:25px;
}

.left h1{
  margin-bottom:10px;
  text-align:center;
}

.left p{
  color:#cbd5e1;
  margin-bottom:30px;
}

.back-btn{
  background:#ff7a00;
  text-decoration:none;
  padding:15px 25px;
  border-radius:12px;
  color:white;
  font-weight:bold;
}

.right{
  padding:60px;
  background:white;
  display:flex;
  flex-direction:column;
  gap:20px;
}

.right h2{
  font-size:40px;
  margin-bottom:20px;
  color:#111827;
}

input{
  padding:16px;
  border-radius:14px;
  border:1px solid #ddd;
  font-size:16px;
}

input:focus{
  outline:none;
  border-color:#ff7a00;
}

.save{
  margin-top:20px;
  padding:18px;
  border:none;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  border-radius:15px;
  color:white;
  font-size:18px;
  font-weight:bold;
  cursor:pointer;
}

.message{
  color:#22c55e;
  font-weight:bold;
  text-align:center;
}

@media(max-width:900px){
  .profile-card{
    grid-template-columns:1fr;
  }
}
</style>