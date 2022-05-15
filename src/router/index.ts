import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import ('../views/HomePage.vue') },
  { path: '/prova', component: () => import ('../views/ProvaPage.vue') },
  { path: '/primanota/entrata', component: () => import ('../views/primanota/EntrataPage.vue') },
  { path: '/primanota/uscita', component: () => import ('../views/primanota/UscitaPage.vue') },
  { path: '/primanota/mese', component: () => import ('../views/primanota/MesePage.vue') },
  { path: '/vetture/lista', component: () => import ('../views/vetture/VetturePage.vue') },
  { path: '/vetture/inseriscichilometri', component: () => import ('../views/vetture/ChilometriPage.vue') },
  { path: '/ragazzi/lista', component: () => import ('../views/ragazzi/RagazziPage.vue') },
  { path: '/attivita/lista', component: () => import ('../views/attivita/AttivitaPage.vue') },
  { path: '/attivita/presenze', component: () => import ('../views/attivita/PresenzePage.vue') },
  { path: '/operatori/lista', component: () => import ('../views/operatori/OperatoriPage.vue') },
  { path: '/operatori/presenze', component: () => import ('../views/operatori/PresenzePage.vue') },
  { path: '/statistiche/presenzeRagazzi', component: () => import ('../views/statistiche/PresenzeragazziPage.vue') },
  { path: '/statistiche/presenzeOperatore', component: () => import ('../views/statistiche/PresenzeoperatoriPage.vue') },
  { path: '/statistiche/chilometriVetture', component: () => import ('../views/statistiche/ChilometrivetturePage.vue') },
  { path: '/statistiche/chilometriRagazzi', component: () => import ('../views/statistiche/ChilometriragazziPage.vue') },
  { path: '/associa/attivitaRagazzo', component: () => import ('../views/associa/AttivitaragazzoPage.vue') },
  { path: '/associa/operatoreOre', component: () => import ('../views/associa/OperatoreorePage.vue') },
  { path: '/login', component: () => import ('../views/LoginPage.vue') },
  { path: '/agricoltura', component: () => import ('../views/agricoltura/AgricolturaPage.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
