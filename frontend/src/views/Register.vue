<template>
  <div class="page">
    <form class="form-card" @submit.prevent="registerUser">
      <h1>Créer un compte</h1>
      <p>Inscription client Mobile et Plus</p>

      <input v-model.trim="nom" placeholder="Nom complet" required />
      <input v-model.trim="email" placeholder="Email" type="email" required />
      <input v-model.trim="telephone" placeholder="Téléphone" required />
      <input
        v-model="password"
        placeholder="Mot de passe"
        type="password"
        required
      />

      <button type="submit" :disabled="chargement">
        {{ chargement ? "Inscription..." : "S'inscrire" }}
      </button>

      <p v-if="message" class="message">
        {{ message }}
      </p>

      <router-link to="/login">
        Déjà un compte ? Connexion
      </router-link>
    </form>
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
const chargement = ref(false);

const registerUser = async () => {
  message.value = "";

  if (
    !nom.value ||
    !email.value ||
    !telephone.value ||
    !password.value
  ) {
    message.value = "Veuillez remplir tous les champs.";
    return;
  }

  chargement.value = true;

  try {
    const response = await axios.post(
      "https://mobile-et-plus.onrender.com/api/auth/register",
      {
        nom: nom.value,
        email: email.value,
        telephone: telephone.value,
        password: password.value
      }
    );

    message.value =
      response.data.message || "Compte créé avec succès.";

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    console.error("Erreur inscription :", error);

    if (!error.response) {
      message.value =
        "Impossible de joindre le serveur. Vérifie le backend ou CORS.";
    } else {
      message.value =
        error.response.data?.message ||
        `Erreur ${error.response.status} pendant l'inscription.`;
    }
  } finally {
    chargement.value = false;
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