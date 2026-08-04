<template>
  <div class="repair-page">
    <section class="hero">
      <div class="left">
        <span class="badge">Service réparation mobile</span>

        <h1>Réparation de téléphones</h1>

        <p>
          Chez Mobile et Plus, les réparations commencent toujours au magasin.
          Prenez un rendez-vous, apportez votre appareil, puis l’admin crée une
          réparation avec un numéro de suivi.
        </p>

        <div class="buttons">
          <router-link class="main-btn" to="/appointment">
            Prendre rendez-vous
          </router-link>

          <router-link class="outline-btn" to="/track-repair">
            Suivre une réparation
          </router-link>
        </div>
      </div>

      <div class="right">
        <div class="phone-card">
  <img src="/repair-phone.jpg" alt="Réparation téléphone">
</div>
      </div>
    </section>

    <section class="services">
      <h2>Réparations <span>disponibles</span></h2>

      <div class="grid">
        <div class="card">
          <h3>📱 Écran cassé</h3>
          <p>Remplacement d’écran pour iPhone, Samsung et Google Pixel.</p>
        </div>

        <div class="card">
          <h3>🔋 Batterie</h3>
          <p>Changement de batterie si votre téléphone se décharge rapidement.</p>
        </div>

        <div class="card">
          <h3>🔌 Port de charge</h3>
          <p>Réparation du port de charge ou problème de câble non détecté.</p>
        </div>

        <div class="card">
          <h3>📷 Caméra</h3>
          <p>Problème de caméra arrière, caméra avant ou lentille cassée.</p>
        </div>

        <div class="card">
          <h3>🔊 Haut-parleur</h3>
          <p>Son faible, micro défectueux ou haut-parleur qui ne fonctionne plus.</p>
        </div>

        <div class="card">
          <h3>🛠️ Diagnostic</h3>
          <p>Inspection complète de l’appareil avant de commencer la réparation.</p>
        </div>
      </div>
    </section>

    <section class="steps-section">
      <h2>Comment ça <span>fonctionne ?</span></h2>

      <div class="steps">
        <div class="step">
          <strong>01</strong>
          <div>
            <h3>Prendre rendez-vous</h3>
            <p>Le client choisit une date et une heure pour venir au magasin.</p>
          </div>
        </div>

        <div class="step">
          <strong>02</strong>
          <div>
            <h3>Déposer l’appareil</h3>
            <p>Le client apporte son téléphone pour un diagnostic.</p>
          </div>
        </div>

        <div class="step">
          <strong>03</strong>
          <div>
            <h3>Création par l’admin</h3>
            <p>L’admin ajoute la réparation dans le système.</p>
          </div>
        </div>

        <div class="step">
          <strong>04</strong>
          <div>
            <h3>Numéro de suivi</h3>
            <p>Le système génère un code tracking pour suivre la réparation.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Besoin d’une réparation ?</h2>
      <p>
        Réservez un rendez-vous, venez au magasin et recevez votre numéro de suivi
        après le dépôt de votre appareil.
      </p>

      <router-link to="/appointment">
        Prendre rendez-vous maintenant
      </router-link>
    </section>
  </div>
</template>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

.repair-page{
  min-height:100vh;
  background:linear-gradient(135deg,#050505,#111827,#1f2937);
  color:white;
  padding:60px;
}

.hero{
  max-width:1300px;
  margin:auto;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:60px;
  align-items:center;
}

.badge{
  display:inline-block;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  border:none;
  padding:12px 25px;
  border-radius:30px;
  font-weight:bold;
  margin-bottom:25px;
}

.left h1{
  font-size:65px;
  line-height:1.1;
  margin-bottom:25px;
}

.left p{
  color:#d1d5db;
  font-size:22px;
  line-height:1.7;
  margin-bottom:35px;
}

.buttons{
  display:flex;
  gap:20px;
  flex-wrap:wrap;
}

.main-btn,
.outline-btn{
  padding:17px 28px;
  border-radius:14px;
  text-decoration:none;
  font-weight:bold;
}

.main-btn{
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
}

.outline-btn{
  border:1px solid #ff7a00;
  color:white;
}

.phone-card{
  height:420px;
  border:4px solid #ff7a00;
  border-radius:35px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:160px;
  background:#111827;
  box-shadow:0 0 45px rgba(255,122,0,.4);
}

.services,
.steps-section{
  max-width:1300px;
  margin:100px auto 0;
}

.services h2,
.steps-section h2{
  text-align:center;
  font-size:48px;
  margin-bottom:45px;
}

.services span,
.steps-section span{
  color:#ff7a00;
}

.grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:25px;
}

.card{
  background:#111827;
  border:1px solid rgba(255,122,0,.3);
  border-radius:25px;
  padding:30px;
  transition:.3s;
}

.card:hover{
  transform:translateY(-8px);
  border-color:#ff7a00;
  box-shadow:0 0 30px rgba(255,122,0,.25);
}

.card h3{
  font-size:25px;
  margin-bottom:15px;
}

.card p{
  color:#d1d5db;
  line-height:1.6;
}

.steps{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:25px;
}

.step{
  display:flex;
  gap:20px;
  background:#111827;
  border-left:5px solid #ff7a00;
  border-radius:20px;
  padding:25px;
}

.step strong{
  color:#ff7a00;
  font-size:35px;
}

.step p{
  color:#d1d5db;
  margin-top:8px;
  line-height:1.6;
}

.cta{
  max-width:1100px;
  margin:100px auto 0;
  background:linear-gradient(90deg,#2b1607,#111827);
  border:1px solid #ff7a00;
  border-radius:30px;
  padding:45px;
  text-align:center;
}

.cta h2{
  font-size:40px;
  margin-bottom:15px;
}

.cta p{
  color:#d1d5db;
  font-size:20px;
  margin-bottom:30px;
}

.cta a{
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  padding:18px 35px;
  border-radius:15px;
  text-decoration:none;
  font-weight:bold;
}

@media(max-width:900px){
  .repair-page{
    padding:30px;
  }

  .hero,
  .grid,
  .steps{
    grid-template-columns:1fr;
  }

  .left h1{
    font-size:42px;
  }
}
.phone-card img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:30px;
}
</style>