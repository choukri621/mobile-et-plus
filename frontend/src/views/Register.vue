<template>
  <div class="page">
    <div class="form-card">
      <h1>Créer un compte</h1>
      <p>Inscription client Mobile et Plus</p>

      <input v-model="nom" placeholder="Nom complet" />
      <input v-model="email" placeholder="Email" type="email" />
      <input v-model="telephone" placeholder="Téléphone" />
      <input v-model="password" placeholder="Mot de passe" type="password" />

      <button @click="registerUser">
        S'inscrire
      </button>

      <p v-if="message" class="message">
        {{ message }}
      </p>

      <router-link to="/login">
        Déjà un compte ? Connexion
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const nom = ref("");
const email = ref("");
const telephone = ref("");
const password = ref("");
const message = ref("");

const registerUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        nom: nom.value,
        email: email.value,
        telephone: telephone.value,
        password: password.value
      }
    );

    message.value = response.data.message || "Compte créé avec succès";

    setTimeout(() => {
      router.push("/login");
    }, 1500);

  } catch (error) {
    console.log(error);

    message.value =
      error.response?.data?.message ||
      "Erreur lors de l'inscription";
  }
};
</script>

<style scoped>
.page{
  min-height:100vh;
  background:linear-gradient(135deg,#111827,#1f2937);
  display:flex;
  align-items:center;
  justify-content:center;
  font-family:Arial;
}

.form-card{
  width:520px;
  background:#1f2937;
  border:1px solid rgba(255,122,0,.3);
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
  margin-bottom:15px;
}

input{
  padding:17px;
  border-radius:14px;
  border:1px solid #374151;
  background:#111827;
  color:white;
  font-size:16px;
}

button{
  padding:17px;
  border:none;
  border-radius:14px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  font-weight:bold;
  font-size:17px;
  cursor:pointer;
}

button:hover{
  opacity:.9;
}

.message{
  color:#22c55e;
  font-weight:bold;
}

a{
  color:#ff7a00;
  text-align:center;
  text-decoration:none;
  font-weight:bold;
}
</style>