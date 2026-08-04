<template>
  <div class="services-page">
    <section class="hero">
      <div class="badge">Mobile et Plus</div>

      <h1>Nos services</h1>

      <p>
        IPTV Premium, réparation mobile, rendez-vous en magasin
        et suivi de réparation avec numéro tracking.
      </p>
    </section>

    <section class="main-services">
      <div class="service big">
        <div class="icon">📺</div>
    <h2>Serveurs IPTV</h2>

<p>
Atlas Pro 80$, OTT Platinium 100$, BoxyHD 150$ et Smart IPTV 200$.
Activation au magasin avec rendez-vous.
</p>

<router-link to="/abonnement">
Voir les serveurs
</router-link>
      
      </div>

      <div class="service big orange-border">
        <div class="icon">📱</div>
        <h2>Réparation Mobile</h2>
        <p>
          Écran cassé, batterie, port de charge, caméra,
          haut-parleur et diagnostic.
        </p>

        <router-link to="/repair">
          Demander réparation
        </router-link>
      </div>
    </section>

    <section class="repair-types">
      <h2>Réparations <span>disponibles</span></h2>

      <div class="repair-grid">
        <div class="repair-card">
          <div>📱</div>
          <h3>Écran cassé</h3>
          <p>Remplacement écran téléphone.</p>
        </div>

        <div class="repair-card">
          <div>🔋</div>
          <h3>Batterie</h3>
          <p>Changement batterie faible.</p>
        </div>

        <div class="repair-card">
          <div>🔌</div>
          <h3>Port de charge</h3>
          <p>Réparation connecteur charge.</p>
        </div>

        <div class="repair-card">
          <div>📷</div>
          <h3>Caméra</h3>
          <p>Problème caméra avant/arrière.</p>
        </div>

        <div class="repair-card">
          <div>🔊</div>
          <h3>Haut-parleur</h3>
          <p>Son faible ou absent.</p>
        </div>

        <div class="repair-card">
          <div>🛠️</div>
          <h3>Diagnostic</h3>
          <p>Analyse complète de l’appareil.</p>
        </div>
      </div>
    </section>

    <section class="tracking-section">
      <div class="tracking-left">
        <h2>Suivi de réparation</h2>
        <p>
          Chaque client reçoit un numéro de suivi unique après
          la demande de réparation.
        </p>

        <router-link to="/track-repair">
          Suivre ma réparation
        </router-link>
      </div>

      <div class="tracking-card">
        <div class="track-code">REP-20260609-4587</div>

        <div class="track-line">
          <div class="step active">Reçu</div>
          <div class="step active">Diagnostic</div>
          <div class="step active">En réparation</div>
          <div class="step">Prêt</div>
          <div class="step">Livré</div>
        </div>
      </div>
    </section>

    <section class="how">
      <h2>Comment ça <span>fonctionne</span> ?</h2>

      <div class="how-grid">
        <div>
          <strong>01</strong>
          <h3>Choisir un service</h3>
          <p>IPTV, réparation ou support.</p>
        </div>

        <div>
          <strong>02</strong>
          <h3>Prendre rendez-vous</h3>
          <p>Sélectionnez une date disponible.</p>
        </div>

        <div>
          <strong>03</strong>
          <h3>Passer au magasin</h3>
          <p>Paiement cash ou diagnostic sur place.</p>
        </div>

        <div>
          <strong>04</strong>
          <h3>Suivre le statut</h3>
          <p>Utilisez votre code tracking.</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <div>
        <h2>Besoin d’IPTV ou d’une réparation ?</h2>
        <p>Réservez un rendez-vous chez Mobile et Plus.</p>
      </div>

      <router-link to="/appointment">
        Prendre rendez-vous
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

.services-page{
  min-height:100vh;
  background:
    radial-gradient(circle at top right, rgba(255,122,0,.18), transparent 30%),
    linear-gradient(135deg,#050505,#111827,#1f2937);
  color:white;
  padding:60px;
}

.hero{
  text-align:center;
  padding:70px 20px;
}

.badge{
  display:inline-block;
  background:rgba(255,122,0,.15);
  border:1px solid #ff7a00;
  color:#ff7a00;
  padding:10px 25px;
  border-radius:30px;
  font-weight:bold;
  margin-bottom:25px;
}

.hero h1{
  font-size:72px;
  margin-bottom:20px;
}

.hero p{
  color:#d1d5db;
  font-size:22px;
  max-width:850px;
  margin:auto;
  line-height:1.7;
}

.main-services{
  max-width:1300px;
  margin:30px auto 100px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:35px;
}

.service{
  background:#111827;
  border:1px solid rgba(255,122,0,.25);
  border-radius:35px;
  padding:45px;
  transition:.3s;
}

.service:hover{
  transform:translateY(-10px);
  box-shadow:0 0 35px rgba(255,122,0,.35);
}

.orange-border{
  border:2px solid #ff7a00;
}

.icon{
  font-size:65px;
  margin-bottom:25px;
}

.service h2{
  font-size:36px;
  margin-bottom:18px;
}

.service p{
  color:#d1d5db;
  font-size:19px;
  line-height:1.7;
  margin-bottom:30px;
}

.service a,
.tracking-left a,
.cta a{
  display:inline-block;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  text-decoration:none;
  padding:15px 28px;
  border-radius:14px;
  font-weight:bold;
}

.repair-types,
.how{
  max-width:1400px;
  margin:0 auto 100px;
}

.repair-types h2,
.how h2{
  text-align:center;
  font-size:48px;
  margin-bottom:45px;
}

.repair-types span,
.how span{
  color:#ff7a00;
}

.repair-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:25px;
}

.repair-card{
  background:#111827;
  border:1px solid rgba(255,122,0,.22);
  padding:35px;
  border-radius:25px;
  text-align:center;
  transition:.3s;
}

.repair-card:hover{
  transform:translateY(-8px) scale(1.02);
  border-color:#ff7a00;
}

.repair-card div{
  font-size:48px;
  margin-bottom:18px;
}

.repair-card h3{
  font-size:24px;
  margin-bottom:12px;
}

.repair-card p{
  color:#d1d5db;
}

.tracking-section{
  max-width:1300px;
  margin:0 auto 100px;
  display:grid;
  grid-template-columns:1fr 1.2fr;
  gap:40px;
  align-items:center;
  background:#111827;
  border:1px solid rgba(255,122,0,.25);
  border-radius:35px;
  padding:50px;
}

.tracking-left h2{
  color:#ff7a00;
  font-size:42px;
  margin-bottom:20px;
}

.tracking-left p{
  color:#d1d5db;
  font-size:20px;
  line-height:1.7;
  margin-bottom:30px;
}

.tracking-card{
  background:#050505;
  border:1px solid #ff7a00;
  border-radius:28px;
  padding:35px;
}

.track-code{
  text-align:center;
  font-size:28px;
  font-weight:bold;
  color:#ff7a00;
  margin-bottom:35px;
}

.track-line{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:12px;
}

.step{
  background:#1f2937;
  padding:18px 10px;
  border-radius:18px;
  text-align:center;
  color:#9ca3af;
  font-weight:bold;
}

.step.active{
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  animation:pulseOrange 2s infinite;
}

.how-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:25px;
}

.how-grid div{
  background:#111827;
  border:1px solid rgba(255,122,0,.25);
  border-radius:25px;
  padding:35px;
  text-align:center;
}

.how-grid strong{
  color:#ff7a00;
  font-size:34px;
}

.how-grid h3{
  margin:18px 0;
}

.how-grid p{
  color:#d1d5db;
}

.cta{
  max-width:1300px;
  margin:70px auto;
  background:linear-gradient(90deg,#2b1607,#111827);
  border:1px solid #ff7a00;
  border-radius:28px;
  padding:45px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.cta h2{
  font-size:34px;
  margin-bottom:10px;
}

.cta p{
  color:#d1d5db;
}

@keyframes pulseOrange{
  0%{box-shadow:0 0 0 0 rgba(255,122,0,.6);}
  70%{box-shadow:0 0 0 12px rgba(255,122,0,0);}
  100%{box-shadow:0 0 0 0 rgba(255,122,0,0);}
}

@media(max-width:1000px){
  .services-page{
    padding:25px;
  }

  .hero h1{
    font-size:45px;
  }

  .main-services,
  .repair-grid,
  .tracking-section,
  .how-grid{
    grid-template-columns:1fr;
  }

  .track-line{
    grid-template-columns:1fr;
  }

  .cta{
    flex-direction:column;
    text-align:center;
    gap:25px;
  }
}
</style>