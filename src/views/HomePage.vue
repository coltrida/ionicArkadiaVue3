<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>HomePage</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Index</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <ion-card style="margin:0">
          <img src="/assets/home.jpg"/>
          <ion-card-header>
            <ion-card-title>Arkadia Onlus</ion-card-title>
            <ion-card-subtitle>Software Gestionale</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content style="margin-top: 52px">
            Copyright - All rights reserved, by <a href="#" class="text-white">@Coltricat</a>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent} from '@ionic/vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCardContent
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
