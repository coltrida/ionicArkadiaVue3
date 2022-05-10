<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Inserisci Uscita</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">

         <ion-item>
          <ion-label>Data</ion-label>
          <ion-input type="date" v-model="elemento.giorno"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Importo</ion-label>
          <ion-input type="number" v-model="elemento.importo"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Causale</ion-label>
            <ion-select interface="popover" v-model="elemento.causale" >
                <ion-select-option value="Laboratorio"> Laboratorio </ion-select-option>
                <ion-select-option value="Benzina"> Benzina </ion-select-option>
                <ion-select-option value="Altro"> Altro </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-button @click="inserisci()" size="large" expand="block">Inserisci</ion-button>

    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonLabel, IonItem,
    IonButton, toastController, IonSelect, IonSelectOption } from '@ionic/vue';
import help from '@/help';

export default defineComponent({
  name: 'UscitaPage',
  components: {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,
      IonInput,
      IonLabel,
      IonItem,
      IonButton,
      IonSelect,
      IonSelectOption
  },

  data(){
    return {
      elemento:{}
    }
  },

  methods:{
    inserisci(){
        this.axios.post(`${help().linkinserisciuscita}`, this.elemento).then(() => {
          this.elemento = {};
          this.openToast();
        });
    },

    async openToast(){
      const toast = await toastController
              .create({
                message: 'Uscita Inserita',
                duration: 2000,
                color: 'success'
              });
      return toast.present();
    }
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

ion-item {
  margin-bottom: 5px;
}

</style>
