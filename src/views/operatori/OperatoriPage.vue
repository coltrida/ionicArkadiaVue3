<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Inserisci Operatore</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <form>
             <ion-item>
              <ion-label>Nome Operatore: </ion-label>
              <ion-input required v-model="elemento.name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Email: </ion-label>
                <ion-input type="email" v-model="elemento.email"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Password: </ion-label>
                <ion-input type="password" v-model="elemento.password"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Conferma Password: </ion-label>
                <ion-input type="password" v-model="elemento.password_confirmation"></ion-input>
            </ion-item>

            <ion-button @click="inserisci()" size="large" expand="block" style="margin-bottom: 10px">Inserisci</ion-button>

        </form>

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
                      <h3>Email: {{item.email}}</h3>
                      <p>Ore settim.: {{item.oresettimanali}}  -  Ore Saldo: {{item.oresaldo}}</p>
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
      name: 'OperatoriPage',

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
              name:'',
              email:'',
              password:'',
              password_confirmation:'',
          }
        }
      },

      mounted(){
        this.listaElementi();
      },

      methods:{
            listaElementi(){
              this.axios.get(`${help().linkoperatori}`).then((response) => {
                  this.elementi = response.data;
                  //console.log(this.ragazzi)
                });
            },

            inserisci(){
                this.axios.post(`${help().linkinseriscioperatore}`, this.elemento).then((response) => {
                  this.elementi.unshift(response.data);
                    this.elemento = {};
                });
            },

          elimina(){
              /*this.axios.delete(`${help().linkragazzi}`+'/'+item.id).then(() => {
                  this.elementi = this.elementi.filter(v => v.id !== item.id);
                  this.openToast(item);
              });*/
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
