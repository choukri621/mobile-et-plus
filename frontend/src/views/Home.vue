<template>
  <div class="home">
    <nav class="navbar">
      <div class="logo">📺 Mobile et <span>Plus</span></div>

      <div class="links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/services">Services</router-link>
        <router-link to="/abonnement">IPTV</router-link>
        <router-link to="/repair">Réparation</router-link>
        <router-link to="/track-repair">Suivi</router-link>
        <router-link to="/appointment">Rendez-vous</router-link>
        <router-link to="/support">Support</router-link>
      </div>

      <div class="nav-buttons" v-if="client">
        <router-link class="login" to="/profile">👤 {{ client.nom }}</router-link>
        <button class="register" @click="logout">Déconnexion</button>
      </div>

      <div class="nav-buttons" v-else>
        <router-link class="login" to="/login">Connexion</router-link>
        <router-link class="register" to="/register">Inscription</router-link>
      </div>
    </nav>

    <section class="hero">
      <div class="hero-text">
        <h1>IPTV Premium & <span>Réparation Mobile</span></h1>
        <p>
          Abonnement IPTV stable, réparation de téléphones/tablettes,
          rendez-vous en magasin et suivi de réparation avec numéro tracking.
        </p>

        <div class="hero-buttons">
          <router-link class="orange-btn" to="/appointment">Prendre rendez-vous</router-link>
          <router-link class="outline-btn" to="/repair">Demander réparation</router-link>
          <router-link class="outline-btn" to="/track-repair">Suivre réparation</router-link>
        </div>
      </div>

      <div class="hero-image">
        <img src="/image.png" alt="IPTV">
      </div>
    </section>

    <div class="stats">
      <div class="stat-card"><h2>+10,000</h2><p>Clients satisfaits</p></div>
      <div class="stat-card"><h2>+2,500</h2><p>Réparations mobiles</p></div>
      <div class="stat-card"><h2>99.9%</h2><p>Satisfaction client</p></div>
      <div class="stat-card"><h2>24/7</h2><p>Support client</p></div>
    </div>

    <section class="section">
      <h2>Nos <span>services</span></h2>

      <div class="features">
        <div class="feature-card">
          <div class="service-icon">📺</div>
          <h3>IPTV Premium</h3>
          <p>Abonnement annuel à 80$ avec chaînes, films, séries, sport et VOD.</p>
          <router-link to="/abonnement">Voir l’offre</router-link>
        </div>

        <div class="feature-card">
          <div class="service-icon">📱</div>
          <h3>Réparation téléphone</h3>
          <p>Écran cassé, batterie, port de charge, caméra et diagnostic mobile.</p>
          <router-link to="/repair">Demander réparation</router-link>
        </div>

        <div class="feature-card">
          <div class="service-icon">🔍</div>
          <h3>Suivi réparation</h3>
          <p>Suivez votre téléphone avec un numéro tracking unique.</p>
          <router-link to="/track-repair">Suivre maintenant</router-link>
        </div>

        <div class="feature-card">
          <div class="service-icon">📅</div>
          <h3>Rendez-vous</h3>
          <p>Réservez pour IPTV, réparation téléphone ou support technique.</p>
          <router-link to="/appointment">Réserver</router-link>
        </div>
      </div>
    </section>

    <section class="repair-section">
      <div class="repair-text">
        <h1>Réparation rapide de téléphones et tablettes</h1>
        <p>
          Nous réparons les appareils mobiles : écran cassé, batterie,
          port de charge, caméra, haut-parleur et problèmes logiciels.
        </p>

        <div class="repair-list">
          <div class="brand-card">📱 iPhone</div>
          <div class="brand-card">🤖 Samsung</div>
          <div class="brand-card">📱 Google Pixel</div>
          <div class="brand-card">🔋 Batteries</div>
          <div class="brand-card">🛠️ Diagnostic</div>
          <div class="brand-card">📺 IPTV Box</div>
        </div>

        <router-link to="/repair" class="orange-btn">Demander une réparation</router-link>
      </div>

      <div class="repair-image">
        <img src="/repair-phone.jpg" alt="Réparation téléphone">
      </div>
    </section>

    <section class="tracking-section">
      <div class="tracking-card">
        <h2>Suivez votre réparation</h2>
        <p>Chaque demande reçoit un code unique.</p>

        <strong>REP-20260609-4587</strong>

        <div class="progress">
          <div></div>
        </div>

        <router-link to="/track-repair">Suivre ma réparation</router-link>
      </div>
    </section>

    <section class="section">

<h2>Nos serveurs <span>IPTV</span></h2>

<div class="plans">

<div class="plan">

<div class="badge">
Atlas Pro
</div>

<h1>80$</h1>

<p>✔ Plus de 15 000 chaînes</p>
<p>✔ Films & Séries VOD</p>
<p>✔ HD / FHD / 4K</p>

<router-link to="/appointment">
Choisir Atlas Pro
</router-link>

</div>

<div class="plan">

<div class="badge">
OTT Platinium
</div>

<h1>100$</h1>

<p>✔ IPTV Premium</p>
<p>✔ Sport international</p>
<p>✔ Très stable</p>

<router-link to="/appointment">
Choisir OTT Platinium
</router-link>

</div>

<div class="plan">

<div class="badge">
BoxyHD
</div>

<h1>150$</h1>

<p>✔ Qualité Ultra HD</p>
<p>✔ Très rapide</p>
<p>✔ Serveur Premium</p>

<router-link to="/appointment">
Choisir BoxyHD
</router-link>

</div>

<div class="plan">

<div class="badge">
Smart IPTV
</div>

<h1>200$</h1>

<p>✔ Compatible Smart TV</p>
<p>✔ Android / iPhone</p>
<p>✔ Installation facile</p>

<router-link to="/appointment">
Choisir Smart IPTV
</router-link>

</div>

</div>

</section>

    <section class="section">
      <h2>Ils nous font <span>confiance</span></h2>

      <div class="reviews">
        <div class="review">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>“Service IPTV très stable et support rapide.”</p>
          <strong>Ahmed B.</strong>
        </div>

        <div class="review">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>“Réparation iPhone rapide, très professionnel.”</p>
          <strong>Karim M.</strong>
        </div>

        <div class="review">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>“Très bon service client, je recommande.”</p>
          <strong>Sophie L.</strong>
        </div>
      </div>
    </section>

    <section class="cta">
      <div>
        <h2>Besoin d’IPTV ou d’une réparation mobile ?</h2>
        <p>Mobile et Plus vous accompagne rapidement et professionnellement.</p>
      </div>

      <router-link to="/appointment">Commencer maintenant</router-link>
    </section>

    <footer>
      <div>
        <h3>📺 Mobile et <span>Plus</span></h3>
        <p>IPTV • Réparation de téléphones/tablettes • Support technique</p>
      </div>

      <div>
        <h4>Liens rapides</h4>
        <p>Accueil</p>
        <p>Services</p>
        <p>IPTV</p>
        <p>Réparation</p>
        <p>Suivi réparation</p>
      </div>

      <div>
        <h4>Contact</h4>
        <p>📞 514-543-4741</p>
        <p>📱 450-540-9733</p>
        <p>✉️ mobileetplus@gmail.com</p>
        <p>🕒 Mardi - Samedi : 11h00 à 18h00</p>
        <p>❌ Dimanche - Lundi : Fermé</p>
      </div>
    </footer>

    <a href="https://wa.me/15145434741" class="whatsapp-btn" target="_blank">💬</a>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const client = ref(null);

onMounted(() => {
  const savedClient = localStorage.getItem("client");
  if (savedClient) {
    client.value = JSON.parse(savedClient);
  }
});

const logout = () => {
  localStorage.removeItem("client");
  client.value = null;
  router.push("/");
};
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

.home{
  min-height:100vh;
  background:linear-gradient(135deg,#050505,#111827,#1f2937);
  color:white;
}

.navbar{
  max-width:1450px;
  margin:35px auto 0;
  background:#1e293b;
  padding:22px 40px;
  border-radius:25px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  box-shadow:0 10px 30px rgba(0,0,0,.4);
  position:sticky;
  top:20px;
  z-index:50;
}

.logo{
  font-size:28px;
  font-weight:900;
}

.logo span,
.section span,
footer span{
  color:#ff7a00;
}

.links{
  display:flex;
  gap:22px;
}

.links a{
  color:white;
  text-decoration:none;
  font-weight:bold;
}

.links a:hover{
  color:#ff7a00;
}

.nav-buttons{
  display:flex;
  gap:15px;
}

.login,
.register{
  text-decoration:none;
  padding:14px 24px;
  border-radius:12px;
  font-weight:bold;
  border:none;
  cursor:pointer;
  font-size:16px;
}

.login{
  background:white;
  color:#111827;
}

.register{
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
}

.hero{
  max-width:1450px;
  margin:90px auto 40px;
  padding:0 20px;
  display:grid;
  grid-template-columns:1fr 1fr;
  align-items:center;
  gap:60px;
}

.hero-text h1{
  font-size:72px;
  line-height:1.15;
  margin-bottom:25px;
  animation:fadeUp 1s ease;
}

.hero-text h1 span{
  color:#ff7a00;
}

.hero-text p{
  font-size:23px;
  line-height:1.7;
  color:#d1d5db;
  margin-bottom:35px;
  animation:fadeUp 1.2s ease;
}

.hero-buttons{
  display:flex;
  gap:20px;
  flex-wrap:wrap;
}

.orange-btn,
.outline-btn{
  text-decoration:none;
  padding:15px 25px;
  border-radius:12px;
  font-weight:bold;
  display:inline-block;
  transition:.3s;
}

.orange-btn{
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
}

.outline-btn{
  color:white;
  border:1px solid #ff7a00;
}

.orange-btn:hover,
.outline-btn:hover{
  transform:translateY(-5px);
  box-shadow:0 0 25px rgba(255,122,0,.5);
}

.hero-image img,
.repair-image img{
  width:100%;
  height:430px;
  object-fit:cover;
  border-radius:30px;
  border:5px solid #ff7a00;
  box-shadow:0 0 45px rgba(255,122,0,.45);
}

.stats{
  max-width:1100px;
  margin:60px auto 80px;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,122,0,.25);
  padding:25px;
  border-radius:20px;
}

.stat-card{
  text-align:center;
  padding:15px;
}

.stat-card h2{
  color:#ff7a00;
  font-size:32px;
}

.stat-card p{
  color:#d1d5db;
}

.section{
  max-width:1450px;
  margin:0 auto;
  padding:80px 40px;
}

.section h2{
  text-align:center;
  font-size:45px;
  margin-bottom:45px;
}

.features,
.reviews{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:25px;
}

.feature-card{
  background:linear-gradient(145deg,#111827,#050505);
  border:1px solid rgba(255,122,0,.35);
  border-radius:28px;
  padding:35px;
  text-align:center;
  transition:.3s;
  position:relative;
  overflow:hidden;
}

.feature-card::before{
  content:"";
  position:absolute;
  top:-60px;
  right:-60px;
  width:130px;
  height:130px;
  background:rgba(255,122,0,.12);
  border-radius:50%;
}

.feature-card:hover{
  transform:translateY(-10px);
  box-shadow:0 0 35px rgba(255,122,0,.35);
  border-color:#ff7a00;
}

.service-icon{
  width:85px;
  height:85px;
  margin:0 auto 25px;
  border-radius:22px;
  background:rgba(255,122,0,.12);
  border:1px solid rgba(255,122,0,.45);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:42px;
}

.feature-card h3{
  margin-bottom:15px;
  font-size:25px;
}

.feature-card p{
  color:#d1d5db;
  line-height:1.6;
  margin-bottom:25px;
}

.feature-card a{
  display:inline-block;
  text-decoration:none;
  color:white;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  padding:13px 22px;
  border-radius:13px;
  font-weight:bold;
}

.repair-section{
  margin:100px auto;
  width:90%;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:50px;
  align-items:center;
}

.repair-text h1{
  font-size:48px;
  margin-bottom:20px;
}

.repair-text p{
  color:#d1d5db;
  font-size:20px;
  line-height:1.7;
  margin-bottom:25px;
}

.repair-list{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:15px;
  margin-bottom:30px;
}

.brand-card{
  background:#111827;
  border:1px solid rgba(255,122,0,.3);
  padding:18px;
  border-radius:16px;
  font-weight:bold;
}

.tracking-section{
  max-width:900px;
  margin:100px auto;
}

.tracking-card{
  background:linear-gradient(135deg,#111827,#050505);
  border:2px solid #ff7a00;
  border-radius:35px;
  padding:50px;
  text-align:center;
  box-shadow:0 0 45px rgba(255,122,0,.35);
}

.tracking-card h2{
  color:#ff7a00;
  font-size:42px;
  margin-bottom:15px;
}

.tracking-card p{
  color:#d1d5db;
  margin-bottom:20px;
}

.tracking-card strong{
  font-size:30px;
  display:block;
  margin-bottom:25px;
}

.progress{
  height:14px;
  background:#1f2937;
  border-radius:20px;
  overflow:hidden;
  margin-bottom:30px;
}

.progress div{
  width:70%;
  height:100%;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  animation:progressAnim 2s ease;
}

.tracking-card a{
  display:inline-block;
  text-decoration:none;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  padding:15px 28px;
  border-radius:14px;
  font-weight:bold;
}

.single-plan{
  max-width:650px;
  margin:auto;
  background:#111827;
  border:2px solid #ff7a00;
  border-radius:30px;
  padding:50px;
  text-align:center;
  box-shadow:0 0 35px rgba(255,122,0,.35);
}

.single-plan h3{
  font-size:35px;
  margin-bottom:20px;
}

.single-plan h1{
  font-size:85px;
  color:#ff7a00;
  margin-bottom:25px;
}

.single-plan p{
  color:#d1d5db;
  font-size:18px;
  line-height:2;
}

.badge{
  display:inline-block;
  background:#ff7a00;
  padding:10px 22px;
  border-radius:25px;
  font-weight:bold;
  margin-bottom:25px;
}

.single-plan a{
  display:inline-block;
  margin-top:30px;
  padding:18px 35px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  text-decoration:none;
  border-radius:15px;
  font-weight:bold;
}

.reviews{
  grid-template-columns:repeat(3,1fr);
}

.review{
  background:#111827;
  border:1px solid rgba(255,122,0,.25);
  border-radius:24px;
  padding:25px;
  text-align:center;
  transition:.3s;
}

.review h3{
  color:#ff7a00;
  margin-bottom:15px;
}

.review p{
  color:#d1d5db;
  line-height:1.6;
}

.cta{
  max-width:1300px;
  margin:70px auto;
  background:linear-gradient(90deg,#2b1607,#111827);
  border:1px solid #ff7a00;
  border-radius:25px;
  padding:40px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.cta h2{
  font-size:32px;
  margin-bottom:10px;
}

.cta p{
  color:#d1d5db;
}

.cta a{
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  padding:16px 30px;
  border-radius:12px;
  color:white;
  text-decoration:none;
  font-weight:bold;
}

footer{
  background:#050505;
  padding:55px 80px;
  display:grid;
  grid-template-columns:2fr 1fr 1fr;
  gap:40px;
  color:#d1d5db;
}

footer h3,
footer h4{
  color:white;
  margin-bottom:15px;
}

.whatsapp-btn{
  position:fixed;
  bottom:25px;
  right:25px;
  width:65px;
  height:65px;
  background:#25D366;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:30px;
  text-decoration:none;
  z-index:999;
  box-shadow:0 0 20px rgba(0,0,0,.4);
  animation:pulse 2s infinite;
}

@keyframes fadeUp{
  from{opacity:0;transform:translateY(35px);}
  to{opacity:1;transform:translateY(0);}
}

@keyframes progressAnim{
  from{width:0;}
  to{width:70%;}
}

@keyframes pulse{
  0%{box-shadow:0 0 0 0 rgba(37,211,102,.6);}
  70%{box-shadow:0 0 0 18px rgba(37,211,102,0);}
  100%{box-shadow:0 0 0 0 rgba(37,211,102,0);}
}

@media(max-width:1000px){
  .navbar,
  .cta{
    flex-direction:column;
    gap:20px;
  }

  .links,
  .nav-buttons{
    flex-wrap:wrap;
    justify-content:center;
  }

  .hero,
  .stats,
  .features,
  .repair-section,
  .reviews,
  footer{
    grid-template-columns:1fr;
  }

  .hero-text h1{
    font-size:45px;
  }
}
.plans{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:25px;
}

.plan{
background:#111827;
padding:35px;
border-radius:25px;
border:2px solid #ff7a00;
text-align:center;
box-shadow:0 0 20px rgba(255,122,0,.2);
transition:.3s;
}

.plan:hover{
transform:translateY(-8px);
box-shadow:0 0 35px rgba(255,122,0,.4);
}

.plan h1{
font-size:60px;
color:#ff7a00;
margin:20px 0;
}

.plan p{
color:#d1d5db;
margin:10px 0;
}

.plan a{
display:block;
margin-top:25px;
padding:15px;
background:#ff7a00;
color:white;
text-decoration:none;
border-radius:12px;
font-weight:bold;
}

@media(max-width:1100px){
.plans{
grid-template-columns:1fr;
}
}
</style>