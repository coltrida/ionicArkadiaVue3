<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Presenze Operatori</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <ion-item>
            <ion-label>Operatore</ion-label>
            <ion-select interface="popover" v-model="elemento.user">
                <ion-select-option v-for="ute in operatori" :key="ute.id" :value="ute.id">
                    {{ute.name}}
                </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label>Settimana</ion-label>
            <ion-select interface="popover" v-model="elemento.settimana">
                <ion-select-option
                        v-for="(ele, index) in settimane"
                        :key="index"
                        :value="index"
                >
                    {{ele}}
                </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-button @click="visualizza()" size="large" expand="block" style="margin-bottom: 10px">Visualizza</ion-button>
        <!--<div class="ion-text-center">
            <ion-badge color="danger" >swipe a sx per eliminare</ion-badge>
        </div>-->

        <ion-list>
          <ion-item-sliding v-for="item in elementi" :key="item.id">
              <!--<ion-item-options side="end">
                  <ion-item-option color="danger" @click="elimina(item)">Elimina</ion-item-option>
              </ion-item-options>-->

              <ion-item>
                  <ion-icon size="large" style="margin-right: 20px" name="calendar-outline"></ion-icon>
                  <ion-label>
                      <h2>Giorno: {{item.giorno}}</h2>
                      <h3>Ore: {{item.ore}}</h3>
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
 IonLabel, IonItem, IonButton, IonList, IonItemSliding, toastController, IonIcon,
IonSelectOption, IonSelect} from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'PresenzeoperatoriPage',

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
          IonSelect
      },

      data(){
        return {
            elementi:[],
            settimane:[],
            settimanaAttuale:'',
            operatori:[],
            elemento:{}
        }
      },

      mounted(){
          this.caricaOperatori();
          this.caricaSettimane();
      },

      methods:{
            visualizza(){
                this.axios.post(`${help().linkstatisticapresenzeoperatori}`, this.elemento).then((response) => {
                  this.elementi = response.data[0];
                  if (this.elementi.length === 0){
                      this.openToast('Nessuna presenza')
                  }
                });
            },

          /*elimina(item){
              this.axios.delete(`${help().linkattivita}`+'/'+item.id).then(() => {
                  this.elementi = this.elementi.filter(v => v.id !== item.id);
                  this.openToast();
              });
          },*/

          async openToast(messaggio){
              const toast = await toastController
                  .create({
                      message: messaggio,
                      duration: 2000,
                      color: 'danger'
                  });
              return toast.present();
          },

          caricaOperatori(){
              this.axios.get(`${help().linkoperatori}`).then((response) => {
                  this.operatori = response.data;
              });
          },

          caricaSettimane(){
              this.axios.get(`${help().linklistasettimane}`).then((response) => {
                  this.settimane = response.data[0];
                  this.elemento.settimana = String(response.data[1]);
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
