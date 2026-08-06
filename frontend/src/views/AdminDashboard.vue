<template>
  <div class="admin-page">
    <aside class="sidebar">
      <div class="logo">📺 Mobile et <span>Plus</span></div>
      <router-link class="active" to="/admin">📊 Tableau de bord</router-link>
      <a href="#clients">👥 Clients</a>
      <a href="#rdv">📅 Rendez-vous</a>
      <a href="#reparations">🛠️ Réparations</a>
      <a href="#support">🎧 Support</a>
      <router-link to="/abonnement">📺 Abonnements IPTV</router-link>
      <router-link to="/">🏠 Accueil</router-link>
      <button class="logout-btn" @click="logoutAdmin">Déconnexion</button>
    </aside>

    <main class="content">
      <div class="top">
        <div>
          <h1>Tableau de bord</h1>
          <p>Vue d’ensemble de votre activité Mobile et Plus</p>
        </div>
        <div class="admin-badge">Admin</div>
      </div>

      <section class="stats">
        <div class="stat-card"><span>👥</span><h2>{{ clients.length }}</h2><p>Clients IPTV</p></div>
        <div class="stat-card"><span>📺</span><h2>{{ clientsActifs }}</h2><p>Abonnements actifs</p></div>
        <div class="stat-card"><span>📅</span><h2>{{ rendezVous.length }}</h2><p>Rendez-vous</p></div>
        <div class="stat-card"><span>🛠️</span><h2>{{ reparationsEnCours }}</h2><p>Réparations en cours</p></div>
      </section>

      <section class="stats">
        <div class="stat-card"><span>💰</span><h2>{{ revenusIPTV }}$</h2><p>Revenus IPTV estimés</p></div>
        <div class="stat-card"><span>✅</span><h2>{{ reparationsTerminees }}</h2><p>Réparations terminées</p></div>
        <div class="stat-card"><span>⏰</span><h2>{{ rendezVousAujourdhui }}</h2><p>RDV aujourd’hui</p></div>
        <div class="stat-card"><span>🎧</span><h2>{{ supports.length }}</h2><p>Tickets support</p></div>
      </section>

      <section class="dashboard-grid">
        <div class="panel chart-panel">
          <h2>Activité de la semaine</h2>
          <div class="chart">
            <div class="bar" style="height:40%"><span>Lun</span></div>
            <div class="bar" style="height:65%"><span>Mar</span></div>
            <div class="bar" style="height:50%"><span>Mer</span></div>
            <div class="bar" style="height:75%"><span>Jeu</span></div>
            <div class="bar" style="height:90%"><span>Ven</span></div>
            <div class="bar" style="height:60%"><span>Sam</span></div>
          </div>
        </div>

        <div class="panel">
          <h2>Dernières activités</h2>
          <div class="activity"><span>📅</span><p>Nouveau rendez-vous ajouté</p></div>
          <div class="activity"><span>🛠️</span><p>Nouvelle réparation enregistrée</p></div>
          <div class="activity"><span>📺</span><p>Abonnement IPTV activé</p></div>
          <div class="activity"><span>🔔</span><p>Notification programmée</p></div>
        </div>
      </section>

      <section class="panel">
       <div class="panel-header">
  <h2>Ajouter un client IPTV</h2>

  <label class="excel-btn">
    📂 Importer Excel
    <input
      type="file"
      accept=".csv,.xlsx,.xls"
      hidden
      @change="importerExcel"
    />
  </label>
</div>
        <div class="form-grid">
          <input v-model="nom" placeholder="Nom complet">
          <input v-model="telephone" placeholder="Téléphone">
          <input v-model="email" placeholder="Email">
        <input
  type="date"
  v-model="nouveauClient.date_debut"
  placeholder="Date début"
/>

<input
  type="date"
  v-model="nouveauClient.date_fin"
  placeholder="Date fin"
/>
          <button @click="ajouterClient">Ajouter client</button>
        </div>

        <p v-if="message" class="message">{{ message }}</p>
      </section>

      <section class="panel" id="clients">
        <h2>Clients IPTV</h2>
        <div class="search-box">
          <input v-model="rechercheClient" placeholder="Rechercher client par nom, email ou téléphone...">
        </div>

        <div class="table-head clients-table">
          <span>Nom</span><span>Téléphone</span><span>Email</span><span>Date début</span><span>Date fin</span><span>Statut</span><span>Actions</span>
        </div>

        <div class="table-row clients-table"v-for="client in clientsPagine" :key="client.id">
          <span>{{ client.nom }}</span>
          <span>{{ client.telephone }}</span>
          <span>{{ client.email }}</span>
          <span>{{ formatDate(client.date_debut) }}</span>
          <span>{{ formatDate(client.date_fin) }}</span>
        <span
  :class="[
    'status',
    statutClient(client) === 'actif'
      ? 'status-actif'
      : 'status-inactif'
  ]"
>
  {{ statutClient(client) }}
</span>
        <span class="actions">
  <button class="edit" @click="ouvrirModifierClient(client)">
    Modifier
  </button>

  <button class="edit" @click="renouvelerClient(client)">
    Renouveler
  </button>

  <button class="delete" @click="supprimerClient(client.id)">
    Supprimer
  </button>
</span>
        </div>
        <div class="pagination">
  <button
    :disabled="pageActuelle === 1"
    @click="pageActuelle--"
  >
    Précédent
  </button>

  <span>Page {{ pageActuelle }} / {{ totalPagesClients }}</span>

  <button
    :disabled="pageActuelle === totalPagesClients"
    @click="pageActuelle++"
  >
    Suivant
  </button>
</div>
      </section>

      <section class="panel" id="rdv">
        <h2>Rendez-vous</h2>
        <div class="table-head rdv-table">
          <span>Nom</span><span>Téléphone</span><span>Email</span><span>Type</span><span>Serveur</span><span>Date</span><span>Heure</span><span>Actions</span>
        </div>

        <div class="table-row rdv-table" v-for="rdv in rendezVous" :key="rdv.id">
          <span>{{ rdv.nom }}</span>
          <span>{{ rdv.telephone }}</span>
          <span>{{ rdv.email }}</span>
          <span>{{ rdv.type_rdv }}</span>
          <span>{{ rdv.serveur_iptv || "-" }}</span>
        <span>{{ formatDate(rdv.date_rdv) }}</span>
<span>{{ rdv.heure_rdv }}</span>

<span class="actions">

  <button
    v-if="rdv.type_rdv && rdv.type_rdv.toLowerCase().includes('abonnement')"
    class="edit"
    @click="activerClientDepuisRdv(rdv)"
  >
    Paiement reçu
  </button>

  <router-link
    v-else
    class="new-btn"
    :to="{
      path: '/admin/new-repair',
      query: {
        nom: rdv.nom,
        telephone: rdv.telephone,
        email: rdv.email
      }
    }"
    
  >
    Créer réparation
  </router-link>
  <router-link to="/admin/import-boxy">
  📥 Importer BoxyHD
</router-link>

  <button
    class="delete"
    @click="supprimerRdv(rdv.id)"
  >
    Supprimer
  </button>

</span>
        </div>
      </section>

      <section class="panel" id="reparations">
        <div class="panel-header">
          <h2>Réparations</h2>
         <router-link class="new-btn" to="/admin/new-repair">
  + Nouvelle réparation
</router-link>
        </div>

        <div class="search-box">
          <input v-model="rechercheReparation" placeholder="Rechercher par nom, téléphone, appareil ou tracking...">
        </div>

        <div class="table-head repairs-table">
          <span>Tracking</span><span>Client</span><span>Téléphone</span><span>Appareil</span><span>Problème</span><span>Statut</span><span>Actions</span>
        </div>

        <div class="table-row repairs-table" v-for="rep in reparationsFiltrees" :key="rep.id">
          <span>{{ rep.tracking_code || "En attente" }}</span>
          <span>{{ rep.nom }}</span>
          <span>{{ rep.telephone }}</span>
          <span>{{ rep.appareil }}</span>
          <span>{{ rep.probleme }}</span>
          <span>
            <select class="status-select" v-model="rep.statut" @change="modifierStatutReparation(rep.id, rep.statut)">
              <option>demande envoyée</option>
              <option>reçu au magasin</option>
              <option>diagnostic</option>
              <option>en réparation</option>
              <option>prêt à récupérer</option>
              <option>livré</option>
            </select>
          </span>
          <span class="actions">
            <button v-if="!rep.confirmed" class="edit" @click="accepterReparation(rep.id)">Accepter</button>
            <button class="delete" @click="supprimerReparation(rep.id)">Supprimer</button>
          </span>
        </div>
      </section>

      <section class="panel" id="support">
        <div class="panel-header">
          <h2>Support</h2>
        </div>

        <div class="table-head support-table">
          <span>Ticket</span><span>Client</span><span>Sujet</span><span>Priorité</span><span>Statut</span><span>Actions</span>
        </div>

        <div class="table-row support-table" v-for="ticket in supports" :key="ticket.id">
          <span>{{ ticket.ticket_code }}</span>
          <span>{{ ticket.nom }}</span>
          <span>{{ ticket.sujet }}</span>
          <span>{{ ticket.priorite }}</span>
          <span>
            <select class="status-select" v-model="ticket.statut" @change="modifierSupport(ticket)">
              <option>Nouveau</option>
              <option>En cours</option>
              <option>Résolu</option>
            </select>
          </span>
          <span class="actions">
            <button class="delete" @click="supprimerSupport(ticket.id)">Supprimer</button>
          </span>
        </div>
      </section>
      <div v-if="clientAModifier" class="modal-bg">
  <div class="modal">
    <h2>Modifier client</h2>

    <input v-model="formModifier.nom" placeholder="Nom">
    <input v-model="formModifier.telephone" placeholder="Téléphone">
    <input v-model="formModifier.email" placeholder="Email">

    <select v-model="formModifier.serveur_iptv">
      <option value="">Serveur IPTV</option>
      <option>Atlas Pro</option>
      <option>BoxyHD</option>
      <option>OTT Platinium</option>
      <option>Smart IPTV</option>
    </select>

    <input v-model="formModifier.date_fin" type="date">

    <div class="modal-actions">
      <button class="edit" @click="sauvegarderModificationClient">
        Sauvegarder
      </button>

      <button class="delete" @click="fermerModifierClient">
        Annuler
      </button>
    </div>
  </div>
</div>
    </main>
  </div>
  <div v-if="clientARenouveler" class="modal-bg">
  <div class="modal">

    <h2>Renouveler l'abonnement</h2>

    <input
      type="text"
      v-model="formRenouvellement.nom"
      placeholder="Nom"
      disabled
    >

    <select
      v-model="formRenouvellement.serveur_iptv"
      @change="changerServeurRenouvellement"
    >
      <option>Atlas Pro</option>
      <option>BoxyHD</option>
      <option>Smart IPTV</option>
      <option>OTT Platinium</option>
    </select>

    <input
      type="date"
      v-model="formRenouvellement.date_debut"
    >

    <input
      type="date"
      v-model="formRenouvellement.date_fin"
    >

    <input
      type="text"
      :value="formRenouvellement.prix + ' $'"
      disabled
    >

    <div class="modal-actions">
      <button class="edit" @click="confirmerRenouvellement">
        Confirmer
      </button>

      <button class="delete" @click="clientARenouveler = false">
        Annuler
      </button>
    </div>

  </div>
</div>
<section class="expiration-section">
  <div class="expiration-header">
    <div>
      <h2>Abonnements proches de l’expiration</h2>
      <p>
        Les clients sont classés automatiquement de la date
        d’expiration la plus proche à la plus éloignée.
      </p>
    </div>

    <button
      class="refresh-btn"
      @click="chargerClientsExpiration"
    >
      Actualiser
    </button>
  </div>

  <div class="expiration-filters">
    <input
      v-model="rechercheExpiration"
      type="text"
      placeholder="Chercher par nom, email, téléphone ou serveur"
      @keyup.enter="chargerClientsExpiration"
    />

    <select
      v-model="periodeExpiration"
      @change="chargerClientsExpiration"
    >
      <option :value="7">7 prochains jours</option>
      <option :value="30">30 prochains jours</option>
      <option :value="60">60 prochains jours</option>
      <option :value="90">90 prochains jours</option>
      <option :value="365">Toute l’année</option>
    </select>

    <button @click="chargerClientsExpiration">
      Rechercher
    </button>
  </div>

  <p v-if="chargementExpiration">
    Chargement des abonnements...
  </p>

  <div
    v-else-if="clientsExpiration.length === 0"
    class="empty-expiration"
  >
    Aucun abonnement trouvé pour cette période.
  </div>

  <div v-else class="expiration-table-wrapper">
    <table class="expiration-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Contact</th>
          <th>Serveur</th>
          <th>Date de fin</th>
          <th>Temps restant</th>
          <th>Notification</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="client in clientsExpiration"
          :key="client.id"
        >
          <td>
            <strong>{{ client.nom }}</strong>
          </td>

          <td>
            <div>{{ client.email || "Aucun email" }}</div>
            <div>{{ client.telephone || "Aucun téléphone" }}</div>
          </td>

          <td>
            {{ client.serveur_iptv || "Non défini" }}
          </td>

          <td>
            {{ client.date_fin?.substring(0, 10) }}
          </td>

          <td>
            <span
              class="expiration-badge"
              :class="classeExpiration(client.jours_restants)"
            >
              <template v-if="client.jours_restants === 0">
                Expire aujourd’hui
              </template>

              <template v-else>
                {{ client.jours_restants }} jour(s)
              </template>
            </span>
          </td>

          <td>
            <span
              v-if="client.contact_disponible"
              class="contact-ok"
            >
              Contact disponible
            </span>

            <span v-else class="contact-missing">
              Contact manquant
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
</template>


<script setup>
// GET clients classés par expiration la plus proche
router.get("/expiration-proche/liste", (req, res) => {
  const jours = Number(req.query.jours) || 30;
  const recherche = String(req.query.recherche || "").trim();

  const sql = `
    SELECT
      id,
      nom,
      telephone,
      email,
      serveur_iptv,
      date_debut,
      date_fin,
      statut,
      DATEDIFF(date_fin, CURDATE()) AS jours_restants,
      CASE
        WHEN
          (email IS NULL OR TRIM(email) = '')
          AND
          (telephone IS NULL OR TRIM(telephone) = '')
        THEN 0
        ELSE 1
      END AS contact_disponible
    FROM clients
    WHERE date_fin IS NOT NULL
    AND DATEDIFF(date_fin, CURDATE()) BETWEEN 0 AND ?
    AND (
      nom LIKE ?
      OR email LIKE ?
      OR telephone LIKE ?
      OR serveur_iptv LIKE ?
    )
    ORDER BY date_fin ASC, nom ASC
  `;

  const terme = `%${recherche}%`;

  db.query(
    sql,
    [jours, terme, terme, terme, terme],
    (err, results) => {
      if (err) {
        console.error("Erreur expirations proches :", err);

        return res.status(500).json({
          message: "Erreur lors du chargement des expirations"
        });
      }

      res.json(results);
    }
  );
});
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const clients = ref([]);
const rendezVous = ref([]);
const reparations = ref([]);
const supports = ref([]);

const nom = ref("");
const telephone = ref("");
const email = ref("");
const dateDebut = ref("");
const message = ref("");

const rechercheClient = ref("");
const rechercheReparation = ref("");
const clientAModifier = ref(null);
const pageActuelle = ref(1);
const clientsParPage = 25;

const clientsPagine = computed(() => {
  const debut = (pageActuelle.value - 1) * clientsParPage;
  const fin = debut + clientsParPage;
  return clientsFiltres.value.slice(debut, fin);
});

const totalPagesClients = computed(() => {
  return Math.ceil(clientsFiltres.value.length / clientsParPage);
});
const formModifier = ref({
  id: "",
  nom: "",
  telephone: "",
  email: "",
  serveur_iptv: "",
  date_fin: ""
});
const calculerPrixServeur = (serveur) => {
  if (!serveur) return 0;
  if (serveur.includes("Atlas")) return 80;
  if (serveur.includes("OTT")) return 100;
  if (serveur.includes("Boxy")) return 150;
  if (serveur.includes("Smart")) return 200;
  return 0;
};
const clientARenouveler = ref(false);

const formRenouvellement = ref({
  id: "",
  nom: "",
  serveur_iptv: "",
  date_debut: "",
  date_fin: "",
  prix: 0
});
const renouvelerClient = (client) => {
  clientARenouveler.value = true;

  const today = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);

  formRenouvellement.value = {
    id: client.id,
    nom: client.nom,
    serveur_iptv: client.serveur_iptv || "Atlas Pro",
    date_debut: today.toISOString().split("T")[0],
    date_fin: nextYear.toISOString().split("T")[0],
        prix: calculerPrixServeur(client.serveur_iptv || "Atlas Pro")
  };
};

const changerServeurRenouvellement = () => {
  formRenouvellement.value.prix =
    calculerPrixServeur(formRenouvellement.value.serveur_iptv);
};

const confirmerRenouvellement = async () => {
  try {
    await axios.put(
      `https://mobile-et-plus.onrender.com/api/clients/${formRenouvellement.value.id}`,
      {
        serveur_iptv: formRenouvellement.value.serveur_iptv,
        date_debut: formRenouvellement.value.date_debut,
        date_fin: formRenouvellement.value.date_fin,
        statut: "actif"
      }
    );

    clientARenouveler.value = false;
    message.value = `Renouvellement confirmé : ${formRenouvellement.value.prix}$`;
    chargerClients();

  } catch (err) {
    console.error(err);
    message.value = "Erreur renouvellement.";
  }
};
const logoutAdmin = () => {
  localStorage.removeItem("admin");
  router.push("/admin-login");
};
const chargerClients = async () => {
  try {
    const res = await axios.get(
      "https://mobile-et-plus.onrender.com/api/clients"
    );

    clients.value = Array.isArray(res.data)
      ? res.data
      : res.data.clients || [];

  } catch (err) {
    console.error(err);
    clients.value = [];
  }
};
const statutClient = (client) => {
  if (!client.date_fin) return "inactif";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fin = new Date(client.date_fin);
  fin.setHours(0, 0, 0, 0);

  return fin >= today ? "actif" : "inactif";
};
const chargerRendezVous = async () => {
  try {
    const res = await axios.get("https://mobile-et-plus.onrender.com/api/rendez-vous");
    rendezVous.value = res.data;
  } catch (err) {
    console.error(err);
    message.value = "Erreur chargement rendez-vous.";
  }
};

const chargerReparations = async () => {
  try {
    const res = await axios.get("https://mobile-et-plus.onrender.com/api/reparations");
    reparations.value = res.data;
  } catch (err) {
    console.error(err);
    message.value = "Erreur chargement réparations.";
  }
};

const chargerSupport = async () => {
  try {
    const res = await axios.get("https://mobile-et-plus.onrender.com/api/support");
    supports.value = res.data;
  } catch (err) {
    console.error(err);
  }
};
const nouveauClient = ref({
  nom: "",
  telephone: "",
  email: "",
  serveur_iptv: "",
  date_debut: "",
  date_fin: ""
});

const ajouterClient = async () => {
  if (
    !nouveauClient.value.nom ||
    !nouveauClient.value.telephone ||
    !nouveauClient.value.email ||
    !nouveauClient.value.date_debut ||
    !nouveauClient.value.date_fin
  ) {
    message.value = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    await axios.post("https://mobile-et-plus.onrender.com/api/clients", {
      nom: nouveauClient.value.nom,
      telephone: nouveauClient.value.telephone,
      email: nouveauClient.value.email,
      serveur_iptv: nouveauClient.value.serveur_iptv,
      date_debut: nouveauClient.value.date_debut,
      date_fin: nouveauClient.value.date_fin
    });

    nouveauClient.value = {
      nom: "",
      telephone: "",
      email: "",
      serveur_iptv: "",
      date_debut: "",
      date_fin: ""
    };

    message.value = "Client ajouté avec succès.";
    await chargerClients();
  } catch (error) {
    console.error(error);
    message.value = "Erreur lors de l'ajout du client.";
  }
};


const supprimerClient = async (id) => {
  try {
    await axios.delete(`https://mobile-et-plus.onrender.com/api/clients/${id}`);
    message.value = "Client supprimé.";
    chargerClients();
  } catch (err) {
    console.error(err);
    message.value = "Erreur suppression client.";
  }
};


const supprimerRdv = async (id) => {
  try {
    await axios.delete(`https://mobile-et-plus.onrender.com/api/rendez-vous/${id}`);
    message.value = "Rendez-vous supprimé.";
    chargerRendezVous();
  } catch (err) {
    console.error(err);
    message.value = "Erreur suppression rendez-vous.";
  }
};

const activerClientDepuisRdv = async (rdv) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    await axios.post("https://mobile-et-plus.onrender.com/api/clients", {
      nom: rdv.nom,
      telephone: rdv.telephone,
      email: rdv.email,
      date_debut: today,
      serveur_iptv: rdv.serveur_iptv || null
    });

    await axios.delete(`https://mobile-et-plus.onrender.com/api/rendez-vous/${rdv.id}`);
    message.value = "Paiement reçu : client activé.";
    chargerClients();
    chargerRendezVous();
  } catch (err) {
    console.error(err);
    message.value = "Erreur activation client.";
  }
};

const modifierStatutReparation = async (id, statut) => {
  try {
    await axios.put(`https://mobile-et-plus.onrender.com/api/reparations/${id}`, { statut });
    message.value = "Statut réparation modifié.";
    chargerReparations();
  } catch (err) {
    console.error(err);
    message.value = "Erreur modification statut.";
  }
};

const accepterReparation = async (id) => {
  try {
    const res = await axios.put(`https://mobile-et-plus.onrender.com/api/reparations/${id}/accept`);
    message.value = `Réparation acceptée. Code tracking : ${res.data.tracking_code}`;
    chargerReparations();
  } catch (err) {
    console.error(err);
    message.value = "Erreur acceptation réparation.";
  }
};

const supprimerReparation = async (id) => {
  try {
    await axios.delete(`https://mobile-et-plus.onrender.com/api/reparations/${id}`);
    message.value = "Réparation supprimée.";
    chargerReparations();
  } catch (err) {
    console.error(err);
    message.value = "Erreur suppression réparation.";
  }
};

const modifierSupport = async (ticket) => {
  try {
    await axios.put(`https://mobile-et-plus.onrender.com/api/support/${ticket.id}`, {
      statut: ticket.statut
    });
    message.value = "Statut support modifié.";
  } catch (err) {
    console.error(err);
    message.value = "Erreur modification support.";
  }
};

const supprimerSupport = async (id) => {
  try {
    await axios.delete(`https://mobile-et-plus.onrender.com/api/support/${id}`);
    message.value = "Ticket supprimé.";
    chargerSupport();
  } catch (err) {
    console.error(err);
    message.value = "Erreur suppression support.";
  }
};

const clientsActifs = computed(() => {
  return clients.value.filter(client => (client.statut || "actif") === "actif").length;
});

const prixServeur = (serveur) => {
  if (!serveur) return 0;
  if (serveur.includes("Atlas")) return 80;
  if (serveur.includes("OTT")) return 100;
  if (serveur.includes("Boxy")) return 150;
  if (serveur.includes("Smart")) return 200;
  return 0;
};

const revenusIPTV = computed(() => {
  return clients.value.reduce((total, client) => total + prixServeur(client.serveur_iptv), 0);
});

const reparationsEnCours = computed(() => {
  return reparations.value.filter(rep =>
    rep.statut === "diagnostic" ||
    rep.statut === "en réparation" ||
    rep.statut === "prêt à récupérer" ||
    rep.statut === "reçu au magasin"
  ).length;
});

const reparationsTerminees = computed(() => {
  return reparations.value.filter(rep => rep.statut === "livré").length;
});

const rendezVousAujourdhui = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return rendezVous.value.filter(rdv => {
    if (!rdv.date_rdv) return false;
    return new Date(rdv.date_rdv).toISOString().split("T")[0] === today;
  }).length;
});

const clientsFiltres = computed(() => {
  const search = rechercheClient.value.toLowerCase();

  let result = clients.value;

  if (search) {
    result = result.filter(client =>
      client.nom?.toLowerCase().includes(search) ||
      client.email?.toLowerCase().includes(search) ||
      client.telephone?.toLowerCase().includes(search)
    );
  }

  return result.sort((a, b) => {
    return new Date(a.date_fin) - new Date(b.date_fin);
  });
});
const reparationsFiltrees = computed(() => {
  const search = rechercheReparation.value.toLowerCase();
  if (!search) return reparations.value;

  return reparations.value.filter(rep =>
    rep.nom?.toLowerCase().includes(search) ||
    rep.telephone?.toLowerCase().includes(search) ||
    rep.tracking_code?.toLowerCase().includes(search) ||
    rep.appareil?.toLowerCase().includes(search)
  );
});

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-CA");
};

onMounted(() => {
  chargerClients();
  chargerRendezVous();
  chargerReparations();
  chargerSupport();
});


const importerExcel = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(
      "https://mobile-et-plus.onrender.com/api/import-excel",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(res.data.message);
    chargerClients(); // recharge la liste
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'import.");
  }
};
const ouvrirModifierClient = (client) => {
  clientAModifier.value = true;

  formModifier.value = {
    id: client.id,
    nom: client.nom || "",
    telephone: client.telephone || "",
    email: client.email || "",
    serveur_iptv: client.serveur_iptv || "",
    date_fin: client.date_fin
      ? new Date(client.date_fin).toISOString().split("T")[0]
      : ""
  };
};

const fermerModifierClient = () => {
  clientAModifier.value = null;
};

const sauvegarderModificationClient = async () => {
  try {
    await axios.put(`https://mobile-et-plus.onrender.com/api/clients/${formModifier.value.id}`, {
      nom: formModifier.value.nom,
      telephone: formModifier.value.telephone,
      email: formModifier.value.email,
      serveur_iptv: formModifier.value.serveur_iptv,
      date_fin: formModifier.value.date_fin
    });

    message.value = "Client modifié avec succès.";
    fermerModifierClient();
    chargerClients();
  } catch (err) {
    console.error(err);
    message.value = "Erreur modification client.";
  }
};
</script>

<style scoped>
*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif;}
.admin-page{min-height:100vh;display:flex;background:radial-gradient(circle at top right,rgba(255,122,0,.15),transparent 25%),linear-gradient(135deg,#050505,#111827,#1f2937);color:white;}
.sidebar{width:280px;background:#050505;padding:32px 24px;display:flex;flex-direction:column;gap:14px;border-right:1px solid rgba(255,122,0,.25);position:fixed;height:100vh;left:0;top:0;}
.logo{color:white;font-size:25px;font-weight:900;margin-bottom:35px;}
.logo span{color:#ff7a00;}
.sidebar a{color:white;text-decoration:none;padding:15px;border-radius:14px;font-weight:bold;transition:.3s;}
.sidebar a:hover,.sidebar a.active{background:linear-gradient(90deg,#ff7a00,#ff5e00);}
.logout-btn{margin-top:auto;padding:15px;border:none;border-radius:14px;background:#dc2626;color:white;font-weight:bold;cursor:pointer;}
.content{margin-left:280px;flex:1;padding:45px;}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:35px;}
.top h1{font-size:55px;margin-bottom:8px;}
.top p{color:#d1d5db;font-size:18px;}
.admin-badge{background:#111827;border:1px solid #ff7a00;padding:13px 28px;border-radius:30px;color:#ff7a00;font-weight:bold;}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-bottom:30px;}
.stat-card{background:#111827;border:1px solid rgba(255,122,0,.25);border-radius:22px;padding:25px;transition:.3s;}
.stat-card:hover{transform:translateY(-7px);box-shadow:0 0 30px rgba(255,122,0,.25);}
.stat-card span{font-size:30px;}
.stat-card h2{font-size:42px;color:#ff7a00;margin:15px 0 8px;}
.stat-card p{color:#d1d5db;}
.dashboard-grid{display:grid;grid-template-columns:1.3fr .7fr;gap:25px;margin-bottom:35px;}
.panel{background:#111827;border:1px solid rgba(255,122,0,.25);border-radius:25px;padding:30px;margin-bottom:35px;overflow-x:auto;}
.panel-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.panel h2{color:#ff7a00;margin-bottom:20px;font-size:28px;}
.chart{height:260px;display:flex;align-items:end;justify-content:space-around;gap:18px;padding-top:30px;}
.bar{width:55px;background:linear-gradient(180deg,#ff7a00,#ff5e00);border-radius:14px 14px 0 0;position:relative;animation:grow 1.2s ease;}
.bar span{position:absolute;bottom:-35px;width:100%;text-align:center;color:#d1d5db;}
.activity{display:flex;align-items:center;gap:14px;background:#050505;padding:16px;border-radius:15px;margin-bottom:14px;}
.activity span{color:#ff7a00;font-size:22px;}
.form-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:18px;}
input,select{padding:16px;border-radius:14px;border:1px solid rgba(255,255,255,.15);background:#050505;color:white;font-size:16px;outline:none;}
input:focus,select:focus{border-color:#ff7a00;}
button,.new-btn,.excel-btn{border:none;border-radius:14px;background:linear-gradient(90deg,#ff7a00,#ff5e00);color:white;font-weight:bold;cursor:pointer;transition:.3s;padding:12px 16px;text-decoration:none;display:inline-block;}
button:hover,.new-btn:hover,.excel-btn:hover{transform:translateY(-4px);box-shadow:0 0 20px rgba(255,122,0,.45);}
.message{margin-top:20px;color:#ff7a00;font-weight:bold;}
.search-box{margin-bottom:18px;}
.search-box input{width:100%;}
.table-head,.table-row{display:grid;gap:10px;align-items:center;padding:16px;min-width:1050px;}
.clients-table{grid-template-columns:1fr 1fr 1.5fr 1fr 1fr 1fr 1.6fr;}
.rdv-table{grid-template-columns:1fr 1fr 1.4fr 1.4fr 1fr 1fr 1fr 1.8fr;}
.repairs-table{grid-template-columns:1.4fr 1fr 1fr 1fr 1.6fr 1.3fr 1.2fr;}
.support-table{grid-template-columns:1.3fr 1.2fr 1fr 1fr 1.2fr 1fr;}
.table-head{background:#050505;border-radius:15px;font-weight:bold;color:#ff7a00;}
.table-row{border-bottom:1px solid rgba(255,255,255,.08);}
.active-status{color:#22c55e;font-weight:bold;}
.actions{display:flex;gap:10px;flex-wrap:wrap;}
.edit{background:#2563eb;}
.delete{background:#dc2626;}
.status-select{width:100%;padding:10px;border-radius:12px;background:#050505;color:white;border:1px solid #ff7a00;}
@keyframes grow{from{height:0;}}
@media(max-width:1100px){.sidebar{position:relative;width:100%;height:auto;}.admin-page{flex-direction:column;}.content{margin-left:0;padding:25px;}.stats,.dashboard-grid,.form-grid{grid-template-columns:1fr;}.top{flex-direction:column;align-items:flex-start;gap:20px;}.top h1{font-size:40px;}}
.modal-bg{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.75);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:9999;
}

.modal{
  width:500px;
  background:#111827;
  border:1px solid #ff7a00;
  border-radius:25px;
  padding:30px;
  display:flex;
  flex-direction:column;
  gap:15px;
}

.modal h2{
  color:#ff7a00;
  text-align:center;
}

.modal-actions{
  display:flex;
  gap:15px;
}
.status {
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 8px;
}

.status-actif {
  color: #22c55e;
  background: rgba(34,197,94,.15);
}

.status-inactif {
  color: #ef4444;
  background: rgba(239,68,68,.15);
}
.pagination{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:15px;
  margin-top:25px;
}

.pagination button:disabled{
  opacity:.4;
  cursor:not-allowed;
}
.expiration-section {
  background: #111827;
  border: 1px solid rgba(255, 122, 0, 0.25);
  border-radius: 22px;
  padding: 28px;
  margin-top: 30px;
  color: white;
}

.expiration-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.expiration-header h2 {
  color: #ff7a00;
  margin-bottom: 8px;
}

.expiration-header p {
  color: #9ca3af;
}

.expiration-filters {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 12px;
  margin-bottom: 25px;
}

.expiration-filters input,
.expiration-filters select {
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #374151;
  background: #030712;
  color: white;
}

.expiration-filters button,
.refresh-btn {
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  background: #ff7a00;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.expiration-table-wrapper {
  overflow-x: auto;
}

.expiration-table {
  width: 100%;
  border-collapse: collapse;
}

.expiration-table th,
.expiration-table td {
  padding: 15px;
  border-bottom: 1px solid #374151;
  text-align: left;
}

.expiration-table th {
  color: #ff7a00;
  background: #0b1220;
}

.expiration-badge {
  display: inline-block;
  padding: 7px 12px;
  border-radius: 20px;
  font-weight: bold;
}

.expiration-badge.urgent {
  background: rgba(239, 68, 68, 0.25);
  color: #f87171;
}

.expiration-badge.danger {
  background: rgba(249, 115, 22, 0.25);
  color: #fb923c;
}

.expiration-badge.warning {
  background: rgba(234, 179, 8, 0.25);
  color: #facc15;
}

.expiration-badge.normal {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.contact-ok {
  color: #22c55e;
  font-weight: bold;
}

.contact-missing {
  color: #ef4444;
  font-weight: bold;
}

.empty-expiration {
  padding: 30px;
  text-align: center;
  color: #9ca3af;
}

@media (max-width: 800px) {
  .expiration-header {
    flex-direction: column;
    align-items: stretch;
  }

  .expiration-filters {
    grid-template-columns: 1fr;
  }
}
</style>
