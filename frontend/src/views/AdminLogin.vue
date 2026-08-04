<template>
  <div class="admin-login-page">
    <div class="login-card">
      <h1>Connexion Admin</h1>
      <p>Accès réservé au superviseur Mobile et Plus</p>

      <input
        v-model="email"
        type="email"
        placeholder="Email admin"
      >

      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
      >

      <button @click="loginAdmin">
        Se connecter
      </button>

      <p v-if="message" class="message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const message = ref("");

const loginAdmin = () => {
  if (
    email.value === "mobileetplus" &&
    password.value === "admin123"
  ) {
    localStorage.setItem("admin", "true");
    router.push("/admin");
  } else {
    message.value = "Email ou mot de passe incorrect.";
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

.admin-login-page{
  min-height:100vh;
  background:linear-gradient(135deg,#050505,#111827,#1f2937);
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  padding:40px;
}

.login-card{
  width:450px;
  background:#111827;
  border:1px solid rgba(255,122,0,.3);
  border-radius:30px;
  padding:45px;
  box-shadow:0 0 45px rgba(255,122,0,.25);
  text-align:center;
}

h1{
  color:#ff7a00;
  font-size:42px;
  margin-bottom:15px;
}

p{
  color:#d1d5db;
  margin-bottom:30px;
}

input{
  width:100%;
  padding:17px;
  margin-bottom:18px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.15);
  background:#050505;
  color:white;
  font-size:16px;
  outline:none;
}

input:focus{
  border-color:#ff7a00;
}

button{
  width:100%;
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
  margin-top:20px;
  color:#ff7a00;
  font-weight:bold;
}
</style>