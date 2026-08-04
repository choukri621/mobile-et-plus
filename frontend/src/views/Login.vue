<template>
  <div class="page">
    <div class="card">
      <div class="left">
        <h1>Bon retour !</h1>
        <p>Connectez-vous à votre compte client.</p>
      </div>

      <div class="form">
        <h2>Connexion</h2>

        <input v-model="email" placeholder="Email" type="email" />
        <input v-model="password" placeholder="Mot de passe" type="password" />

        <button @click="loginUser">Connexion</button>

        <p v-if="message" class="message">{{ message }}</p>

        <router-link to="/register">Créer un compte</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const message = ref("");

const login = async () => {
  try {
    const res = await axios.post(
      "https://mobile-et-plus.onrender.com/api/auth/login",
      {
        email: email.value,
        password: password.value
      }
    );

    localStorage.setItem(
      "client",
      JSON.stringify(res.data.client)
    );

    router.push("/");
  } catch (err) {
    message.value =
      err.response?.data?.message ||
      "Erreur connexion";
  }
};
</script>

<style scoped>
.page{
  min-height:100vh;
  background:#111827;
  display:flex;
  align-items:center;
  justify-content:center;
  font-family:Arial;
  padding:40px;
}

.card{
  width:1000px;
  background:#1f2937;
  border-radius:30px;
  display:grid;
  grid-template-columns:1fr 1fr;
  overflow:hidden;
  box-shadow:0 0 40px rgba(255,122,0,.25);
}

.left{
  padding:60px;
  color:white;
  background:linear-gradient(135deg,#111827,#ff7a00);
}

.left h1{
  font-size:50px;
  margin-bottom:20px;
}

.left p{
  font-size:22px;
  color:#f3f4f6;
}

.form{
  padding:60px;
  display:flex;
  flex-direction:column;
  gap:20px;
}

.form h2{
  color:#ff7a00;
  font-size:40px;
}

input{
  padding:18px;
  border-radius:14px;
  border:1px solid #374151;
  background:#111827;
  color:white;
  font-size:16px;
}

button{
  padding:18px;
  border:none;
  border-radius:14px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  font-weight:bold;
  font-size:17px;
  cursor:pointer;
}

.message{
  color:#22c55e;
  text-align:center;
  font-weight:bold;
}

a{
  color:#ff7a00;
  text-align:center;
  text-decoration:none;
  font-weight:bold;
}

@media(max-width:800px){
  .card{
    grid-template-columns:1fr;
  }
}
</style>