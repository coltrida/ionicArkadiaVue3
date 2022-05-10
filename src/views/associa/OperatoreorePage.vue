<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Associa Operatore - Ore Sett.</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <ion-item>
            <ion-label>Operatore</ion-label>
            <ion-select interface="popover" v-model="elemento.operatore">
                <ion-select-option v-for="ute in operatori" :key="ute.id" :value="ute.id">
                    {{ute.name}}
                </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label>Ore Settimanali: </ion-label>
            <ion-input type="number" v-model="elemento.ore"></ion-input>
        </ion-item>

        <ion-button @click="inserisci()" size="large" expand="block" style="margin-bottom: 10px">Inserisci</ion-button>

        <ion-list>
          <ion-item-sliding v-for="item in elementi" :key="item.id">
              <ion-item>
                  <ion-icon size="large" style="margin-right: 20px" name="link-outline"></ion-icon>
                  <ion-label>
                      <h2>Nome: {{item.name}}</h2>
                      <h3>Ore Settimanali: {{item.oresettimanali}}</h3>

                  </ion-label>
                  <ion-label>
                      <p>Ore Saldo: {{item.oresaldo}}</p>
                  </ion-label>
              </ion-item>
          </ion-item-sliding>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
 IonLabel, IonItem, IonButton, IonList,  IonItemSliding,  toastController, IonIcon,
IonSelectOption, IonSelect, IonInput} from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'AttivitaragazzoPage',

      components: {
          IonButtons,
          IonContent,
          IonHeader,
          IonMenuButton,
          IonPage,
          IonTitle,
          IonToolbar,
          IonLabel,
          IonItem,
          IonButton,
          IonList,
          IonItemSliding,
          IonIcon,
          IonSelectOption,
          IonSelect,
          IonInput
      },

      data(){
        return {
            elementi:[],
            operatori:[],
            elemento:{},
        }
      },

      mounted(){
          this.caricaOperatori();
      },

      methods:{
            inserisci(){
                this.axios.post(`${help().linkaggiungistassociazioneoperatoreore}`, this.elemento).then(() => {
                    this.caricaOperatori();
                    this.openToast('associazione effettuata');
                });
            },

          async openToast(messaggio){
              const toast = await toastController
                  .create({
                      message: messaggio,
                      duration: 2000,
                      color: 'success'
                  });
              return toast.present();
          },

          caricaOperatori(){
              this.axios.get(`${help().linkoperatori}`).then((response) => {
                  this.operatori = response.data;
                  this.elementi = response.data;
              });
          },

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

ion-button {
  margin-bottom: 50px;
}

</style>
