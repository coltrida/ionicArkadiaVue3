<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Inserisci Attività</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
         <ion-item>
          <ion-label>Nome Attività: </ion-label>
          <ion-input required v-model="elemento.nomeAttivita"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Tipo</ion-label>
            <ion-select interface="popover" v-model="elemento.tipo">
                <ion-select-option value="mensile">Mensile</ion-select-option>
                <ion-select-option value="settimanale">Settimanale</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Costo: </ion-label>
            <ion-input type="number" v-model="elemento.costo"></ion-input>
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
                  <ion-icon size="large" style="margin-right: 20px" name="logo-angular"></ion-icon>
                  <ion-label>
                      <h2>Nome: {{item.name}}</h2>
                      <h3>Tipo: {{item.tipo}}</h3>
                      <p>Costo: {{item.costo}} euro</p>
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
 IonLabel, IonItem, IonButton, IonList,  IonBadge, IonItemSliding, IonItemOptions, IonItemOption, toastController, IonIcon,
IonSelectOption, IonSelect} from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'AttivitaPage',

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
          IonIcon,
          IonSelectOption,
          IonSelect
      },

      data(){
        return {
            elementi:[],
            elemento:{
                nomeAttivita:'',
                costo:'',
                tipo:''
          }
        }
      },

      mounted(){
        this.listaElementi();
      },

      methods:{
          listaElementi(){
              this.axios.get(`${help().linkattivita}`).then((response) => {
                  this.elementi = response.data;
             //     console.log(this.listaAttivita)
                });
            },

            inserisci(){
                this.axios.post(`${help().linkinserisciattivita}`, this.elemento).then((response) => {
                  this.elementi.unshift(response.data);
                    this.elemento = {};
                });
            },

          elimina(item){
              this.axios.delete(`${help().linkattivita}`+'/'+item.id).then(() => {
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
