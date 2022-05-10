<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Inserisci Ragazzo</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
         <ion-item>
          <ion-label>Nome Ragazzo: </ion-label>
          <ion-input required v-model="elemento.nomeRagazzo"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Voucher: </ion-label>
            <ion-input type="number" v-model="elemento.voucher"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Scadenza Voucher: </ion-label>
            <ion-input type="date" v-model="elemento.scadenza"></ion-input>
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
                  <ion-avatar slot="start">
                      <img src="/assets/avatar.png" />
                  </ion-avatar>
                  <ion-label>
                      <h2>Nome: {{item.name}}</h2>
                      <h3>Voucher: {{item.voucher}}</h3>
                      <p>Scadenza: {{item.scadenza}}</p>
                  </ion-label>
              </ion-item>
          </ion-item-sliding>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput,
 IonLabel, IonItem, IonButton, IonList,  IonBadge, IonItemSliding, IonItemOptions, IonItemOption, IonAvatar, toastController } from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'RagazziPage',

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
          IonBadge,
          IonItemSliding,
          IonItemOptions,
          IonItemOption,
          IonAvatar
      },

      data(){
        return {
            elementi:[],
            elemento:{
              nomeRagazzo:'',
              voucher:'',
              scadenza:''
          }
        }
      },

      mounted(){
        this.listaElementi();
      },

      methods:{
          listaElementi(){
              this.axios.get(`${help().linkragazzi}`).then((response) => {
                  this.elementi = response.data;
                  //console.log(this.ragazzi)
                });
            },

            inserisci(){
                this.axios.post(`${help().linkinserisciragazzo}`, this.elemento).then((response) => {
                  this.elementi.unshift(response.data);
                    this.elemento = {};
                });
            },

          elimina(item){
              this.axios.delete(`${help().linkragazzi}`+'/'+item.id).then(() => {
                  this.elementi = this.elementi.filter(v => v.id !== item.id);
                  this.openToast(item);
              });
          },

          async openToast(item){
              const toast = await toastController
                  .create({
                      message: item.name + ' eliminato',
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
