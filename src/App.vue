<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-menu-toggle auto-hide="false" >
            <ion-list-header router-link="/" style='margin-bottom:30px'>
              <ion-icon name="home-outline" style="margin-right: 15px"></ion-icon>
              <ion-label>Arkadia</ion-label>
              <ion-avatar>
                <img v-if="role == 1" style="width: 70px; height: 70px; transform: translate(-20px, -5px)" src="/assets/admin.jpg" />
                <img v-else style="width: 50px; height: 50px" src="/assets/avatar.png" />
              </ion-avatar>
            </ion-list-header>
            </ion-menu-toggle>
            <!-- <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }} {{i}}</ion-label>
              </ion-item>
            </ion-menu-toggle> -->
          </ion-list>
  
          <ion-list id="labels-list" >
            <div v-if="userLogin">

            <ion-accordion-group>
              <ion-accordion value="primaNota" v-if="role == 1">
                <ion-item slot="header">
                  <ion-label>Prima Nota</ion-label>
                </ion-item>
                <ion-list slot="content">
                  <ion-menu-toggle auto-hide="false" >
                    <ion-item @click="selectedIndex = 1" router-direction="root" router-link="/primanota/entrata" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 1 }">
                      <ion-label>Inserisci Entrata</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 2" router-direction="root" router-link="/primanota/uscita" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 2 }">
                      <ion-label>Inserisci Uscita</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 3" router-direction="root" router-link="/primanota/mese" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 3 }">
                      <ion-label>Saldo Mese</ion-label>
                    </ion-item>
                  </ion-menu-toggle>
                </ion-list>
              </ion-accordion>

              <ion-accordion value="vetture">
                <ion-item slot="header">
                  <ion-label>Vetture</ion-label>
                </ion-item>
                <ion-list slot="content">
                  <ion-menu-toggle auto-hide="false" >
                    <ion-item v-if="role == 1" @click="selectedIndex = 4" router-direction="root" router-link="/vetture/lista" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 4 }">
                      <ion-label>Lista</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 9" router-direction="root" router-link="/vetture/inseriscichilometri" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 9 }">
                      <ion-label>Inserisci Chilometri</ion-label>
                    </ion-item>
                  </ion-menu-toggle>
                </ion-list>
              </ion-accordion>

              <ion-accordion value="ragazzi" v-if="role == 1">
                <ion-item slot="header">
                  <ion-label>Ragazzi</ion-label>
                </ion-item>
                <ion-list slot="content">
                  <ion-menu-toggle auto-hide="false" >
                    <ion-item @click="selectedIndex = 5" router-direction="root" router-link="/ragazzi/lista" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 5 }">
                      <ion-label>Lista</ion-label>
                    </ion-item>
                  </ion-menu-toggle>
                </ion-list>
              </ion-accordion>

              <ion-accordion value="attivita">
                <ion-item slot="header">
                  <ion-label>Attivita</ion-label>
                </ion-item>
                <ion-list slot="content">
                  <ion-menu-toggle auto-hide="false" >
                    <ion-item v-if="role == 1" @click="selectedIndex = 6" router-direction="root" router-link="/attivita/lista" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 6 }">
                      <ion-label>Lista</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 10" router-direction="root" router-link="/attivita/presenze" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 10 }">
                      <ion-label>Presenze</ion-label>
                    </ion-item>
                  </ion-menu-toggle>
                </ion-list>
              </ion-accordion>

              <ion-accordion value="operatori">
                <ion-item slot="header">
                  <ion-label>Operatori</ion-label>
                </ion-item>
                <ion-list slot="content">
                  <ion-menu-toggle auto-hide="false" >
                    <ion-item v-if="role == 1" @click="selectedIndex = 7" router-direction="root" router-link="/operatori/lista" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 7 }">
                      <ion-label>Lista</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 8" router-direction="root" router-link="/operatori/presenze" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 8 }">
                      <ion-label>Presenze Operatori</ion-label>
                    </ion-item>
                  </ion-menu-toggle>
                </ion-list>
              </ion-accordion>

              <ion-accordion value="statistiche" v-if="role == 1">
                <ion-item slot="header">
                  <ion-label>Statistiche</ion-label>
                </ion-item>
                <ion-list slot="content">
                  <ion-menu-toggle auto-hide="false" >
                    <ion-item @click="selectedIndex = 11" router-direction="root" router-link="/statistiche/presenzeRagazzi" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 11 }">
                      <ion-label>Presenze Ragazzi</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 12" router-direction="root" router-link="/statistiche/presenzeOperatore" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 12 }">
                      <ion-label>Presenze Operatori</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 13" router-direction="root" router-link="/statistiche/chilometriVetture" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 13 }">
                      <ion-label>Chilometri Vetture</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 14" router-direction="root" router-link="/statistiche/chilometriRagazzi" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 14 }">
                      <ion-label>Chilometri Ragazzi</ion-label>
                    </ion-item>
                    <!--<ion-item @click="selectedIndex = 15" router-direction="root" router-link="/statistiche/costiRagazzi" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 15 }">
                      <ion-label>Costi Ragazzi</ion-label>
                    </ion-item>-->
                  </ion-menu-toggle>
                </ion-list>
              </ion-accordion>

              <ion-accordion value="associa" v-if="role == 1">
                <ion-item slot="header">
                  <ion-label>Associa</ion-label>
                </ion-item>
                <ion-list slot="content">
                  <ion-menu-toggle auto-hide="false" >
                    <ion-item @click="selectedIndex = 16" router-direction="root" router-link="/associa/attivitaRagazzo" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 16 }">
                      <ion-label>Associa Attività - Ragazzo</ion-label>
                    </ion-item>
                    <ion-item @click="selectedIndex = 17" router-direction="root" router-link="/associa/operatoreOre" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 17 }">
                      <ion-label>Associa Operatore - Ore sett.</ion-label>
                    </ion-item>
                  </ion-menu-toggle>
                </ion-list>
              </ion-accordion>
            </ion-accordion-group>
            </div>
            <div v-else>
              <ion-accordion-group>
              <ion-accordion value="login">
                <ion-item slot="header">
                  <ion-label>login</ion-label>
                </ion-item>
                <ion-list slot="content">
                  <ion-menu-toggle auto-hide="false" >
                    <ion-item @click="selectedIndex = 1" router-direction="root" router-link="/login" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === 1 }">
                      <ion-label>Login</ion-label>
                    </ion-item>
                  </ion-menu-toggle>
                </ion-list>
              </ion-accordion>
              </ion-accordion-group>
            </div>
            <ion-item style="margin-top: 40px" color="danger" @click="chiudiApp()">
              <ion-label>Chiudi App</ion-label>
            </ion-item>
          </ion-list>

        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main-content"></ion-router-outlet>

    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane,
IonAccordionGroup, IonAccordion, IonIcon, IonAvatar } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';


import { Plugins } from '@capacitor/core';
const { App } = Plugins;

export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenu, 
    IonMenuToggle,  
    IonRouterOutlet, 
    IonSplitPane,
    IonAccordion,
    IonAccordionGroup,
    IonIcon,
    IonAvatar
  },
  data(){
    return{
      userLogin: sessionStorage.getItem('user'),
      role: sessionStorage.getItem('role'),
    }
  },
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Inbox',
        url: '/folder/Inbox',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Outbox',
        url: '/folder/Outbox',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
      },
      {
        title: 'Favorites',
        url: '/folder/Favorites',
        iosIcon: heartOutline,
        mdIcon: heartSharp
      },
      {
        title: 'Archived',
        url: '/folder/Archived',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
      },
      {
        title: 'Trash',
        url: '/folder/Trash',
        iosIcon: trashOutline,
        mdIcon: trashSharp
      },
      {
        title: 'Spam',
        url: '/folder/Spam',
        iosIcon: warningOutline,
        mdIcon: warningSharp
      }
    ];
    const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    const route = useRoute();
    
    return { 
      selectedIndex,
      appPages, 
      labels,
      archiveOutline, 
      archiveSharp, 
      bookmarkOutline, 
      bookmarkSharp, 
      heartOutline, 
      heartSharp, 
      mailOutline, 
      mailSharp, 
      paperPlaneOutline, 
      paperPlaneSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  },
  methods:{
    chiudiApp(){
      App.exitApp();
    }
  }
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 0 0 0 15px; 
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
