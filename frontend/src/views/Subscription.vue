<template>
  <div class="subscription-page">
    <aside class="sidebar">
      <div class="logo">📺 Mobile et <span>Plus</span></div>

      <router-link class="active" to="/abonnement">Abonnement</router-link>
      <router-link to="/services">Services</router-link>
      <router-link to="/repair">Réparation</router-link>
      <router-link to="/track-repair">Suivi réparation</router-link>
      <router-link to="/appointment">Rendez-vous</router-link>
      <router-link to="/support">Support</router-link>
      <router-link to="/">Accueil</router-link>
    </aside>

    <main class="content">
      <section class="header">
        <h1>Serveurs IPTV disponibles</h1>
        <p>
          Choisissez votre serveur IPTV. Le paiement se fait directement au magasin
          après confirmation du rendez-vous.
        </p>
      </section>

      <section class="plans">
        <div class="plan-card">
          <div class="badge">Populaire</div>
          <h2>Atlas Pro</h2>
          <h1>80$</h1>
          <p>✓ Chaînes internationales</p>
          <p>✓ Films et séries VOD</p>
          <p>✓ Qualité HD / FHD / 4K</p>
          <p>✓ Activation au magasin</p>
          <router-link to="/appointment">Choisir Atlas Pro</router-link>
        </div>

        <div class="plan-card">
          <div class="badge">Premium</div>
          <h2>OTT Platinium</h2>
          <h1>100$</h1>
          <p>✓ IPTV Premium</p>
          <p>✓ Sport international</p>
          <p>✓ Films et séries</p>
          <p>✓ Support technique</p>
          <router-link to="/appointment">Choisir OTT Platinium</router-link>
        </div>

        <div class="plan-card">
          <div class="badge">HD</div>
          <h2>BoxyHD</h2>
          <h1>150$</h1>
          <p>✓ Serveur rapide</p>
          <p>✓ Qualité HD / 4K</p>
          <p>✓ Chaînes sport</p>
          <p>✓ Multi-appareils</p>
          <router-link to="/appointment">Choisir BoxyHD</router-link>
        </div>

        <div class="plan-card">
          <div class="badge">Smart TV</div>
          <h2>Smart IPTV</h2>
          <h1>200$</h1>
          <p>✓ Compatible Smart TV</p>
          <p>✓ Android / iPhone</p>
          <p>✓ MAG Box / PC</p>
          <p>✓ Installation assistée</p>
          <router-link to="/appointment">Choisir Smart IPTV</router-link>
        </div>
      </section>

      <section class="info-section">
        <div class="info-card">
          <h2>Comment ça fonctionne ?</h2>

          <div class="step">
            <strong>01</strong>
            <div>
              <h3>Choisissez un serveur</h3>
              <p>Atlas Pro, OTT Platinium, BoxyHD ou Smart IPTV.</p>
            </div>
          </div>

          <div class="step">
            <strong>02</strong>
            <div>
              <h3>Réservez un rendez-vous</h3>
              <p>Choisissez une date et une heure disponible.</p>
            </div>
          </div>

          <div class="step">
            <strong>03</strong>
            <div>
              <h3>Paiement au magasin</h3>
              <p>Le paiement se fait cash directement sur place.</p>
            </div>
          </div>

          <div class="step">
            <strong>04</strong>
            <div>
              <h3>Activation par l’admin</h3>
              <p>L’admin active votre abonnement après paiement.</p>
            </div>
          </div>
        </div>

        <div class="price-card">
          <h2>Résumé des prix</h2>

          <div class="price-row">
            <span>Atlas Pro</span>
            <strong>80$</strong>
          </div>

          <div class="price-row">
            <span>OTT Platinium</span>
            <strong>100$</strong>
          </div>

          <div class="price-row">
            <span>BoxyHD</span>
            <strong>150$</strong>
          </div>

          <div class="price-row">
            <span>Smart IPTV</span>
            <strong>200$</strong>
          </div>

          <div class="notice">
            🔔 Le système envoie automatiquement un rappel avant l’expiration
            de l’abonnement.
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

.subscription-page{
  min-height:100vh;
  display:flex;
  background:linear-gradient(135deg,#050505,#111827,#1f2937);
  color:white;
}

.sidebar{
  width:280px;
  background:#050505;
  padding:35px 25px;
  display:flex;
  flex-direction:column;
  gap:18px;
  border-right:1px solid rgba(255,122,0,.25);
}

.logo{
  font-size:25px;
  font-weight:900;
  margin-bottom:35px;
}

.logo span{
  color:#ff7a00;
}

.sidebar a{
  color:white;
  text-decoration:none;
  padding:16px;
  border-radius:14px;
  font-weight:bold;
  transition:.3s;
}

.sidebar a:hover,
.sidebar a.active{
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
}

.content{
  flex:1;
  padding:55px;
}

.header{
  margin-bottom:45px;
}

.header h1{
  font-size:58px;
  margin-bottom:15px;
}

.header p{
  color:#d1d5db;
  font-size:21px;
  max-width:900px;
  line-height:1.6;
}

.plans{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:25px;
  margin-bottom:55px;
}

.plan-card{
  background:#111827;
  border:1px solid rgba(255,122,0,.3);
  border-radius:28px;
  padding:35px;
  text-align:center;
  box-shadow:0 0 25px rgba(255,122,0,.15);
  transition:.3s;
}

.plan-card:hover{
  transform:translateY(-8px);
  border-color:#ff7a00;
  box-shadow:0 0 35px rgba(255,122,0,.35);
}

.badge{
  display:inline-block;
  background:#ff7a00;
  padding:9px 20px;
  border-radius:25px;
  font-weight:bold;
  margin-bottom:22px;
}

.plan-card h2{
  font-size:30px;
  margin-bottom:18px;
}

.plan-card h1{
  font-size:70px;
  color:#ff7a00;
  margin-bottom:25px;
}

.plan-card p{
  color:#d1d5db;
  font-size:17px;
  line-height:1.8;
}

.plan-card a{
  display:inline-block;
  margin-top:25px;
  padding:16px 22px;
  background:linear-gradient(90deg,#ff7a00,#ff5e00);
  color:white;
  text-decoration:none;
  border-radius:14px;
  font-weight:bold;
}

.info-section{
  display:grid;
  grid-template-columns:1.2fr .8fr;
  gap:30px;
}

.info-card,
.price-card{
  background:#111827;
  border:1px solid rgba(255,122,0,.25);
  border-radius:28px;
  padding:35px;
}

.info-card h2,
.price-card h2{
  color:#ff7a00;
  font-size:34px;
  margin-bottom:25px;
}

.step{
  display:flex;
  gap:18px;
  background:#050505;
  padding:20px;
  border-radius:18px;
  border-left:5px solid #ff7a00;
  margin-bottom:18px;
}

.step strong{
  color:#ff7a00;
  font-size:28px;
}

.step h3{
  margin-bottom:7px;
}

.step p{
  color:#d1d5db;
  line-height:1.5;
}

.price-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  background:#050505;
  padding:18px;
  border-radius:15px;
  margin-bottom:15px;
}

.price-row span{
  font-weight:bold;
}

.price-row strong{
  color:#ff7a00;
  font-size:24px;
}

.notice{
  margin-top:25px;
  background:#050505;
  border-left:5px solid #ff7a00;
  padding:20px;
  border-radius:15px;
  color:#d1d5db;
  line-height:1.6;
}

@media(max-width:1100px){
  .subscription-page{
    flex-direction:column;
  }

  .sidebar{
    width:100%;
  }

  .content{
    padding:30px;
  }

  .plans,
  .info-section{
    grid-template-columns:1fr;
  }

  .header h1{
    font-size:42px;
  }
}
</style>