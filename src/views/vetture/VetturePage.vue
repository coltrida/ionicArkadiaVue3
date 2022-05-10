<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Inserisci Vettura</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Vetture</ion-title>
            </ion-toolbar>
        </ion-header>

         <ion-item>
          <ion-label>Nome Vettura: </ion-label>
          <ion-input required v-model="elemento.nomevettura"></ion-input>
        </ion-item>

        <ion-button @click="inserisci()" size="large" expand="block" style="margin-bottom: 10px">Inserisci</ion-button>
        <div class="ion-text-center">
            <ion-badge color="danger" >swipe a sx per eliminare</ion-badge>
        </div>

        <ion-list>
          <ion-item-sliding v-for="item in elementi" :key="item.id">
              <ion-item-options side="end">
                  <ion-item-option color="danger" @click="elimina(item)">Elimina</ion-item-option>
              </ion-item-options>

              <ion-item>
                  <ion-chip color="primary">
                      <ion-label color="dark">{{item.name}}</ion-label>
                  </ion-chip>
              </ion-item>
          </ion-item-sliding>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput,
 IonLabel, IonItem, IonButton, IonList, IonChip, IonBadge, IonItemSliding, IonItemOptions, IonItemOption, toastController } from '@ionic/vue';
import help from '@/help';

export default defineComponent({
          name: 'VetturePage',

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
              IonList,
              IonChip,
              IonBadge,
              IonItemSliding,
              IonItemOptions,
              IonItemOption
          },

          data(){
            return {
                elementi:[],
                elemento:{
                   nomevettura:''
              }
            }
          },

          mounted(){
            this.listaElementi();
          },

          methods:{
            listaElementi(){
              this.axios.get(`${help().linkvetture}`).then((response) => {
                  this.elementi = response.data;
                });
            },

            inserisci(){
                this.axios.post(`${help().linkinseriscivettura}`, this.elemento).then((response) => {
                  this.elementi.unshift(response.data);
                    this.elemento = {};
                });
            },

          elimina(item){
              this.axios.delete(`${help().linkvetture}`+'/'+item.id).then(() => {
                  this.elementi = this.elementi.filter(v => v.id !== item.id);
                  this.openToast(item);
              });
          },

          async openToast(item){
              const toast = await toastController
                  .create({
                      message: 'Vettura '+ item.name +' eliminata',
                      duration: 2000,
                      color: 'danger'
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

ion-button {
  margin-bottom: 50px;
}

</style>
