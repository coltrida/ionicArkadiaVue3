<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Associa Attività - Ragazzo</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <ion-item>
            <ion-label>Attività</ion-label>
            <ion-select interface="popover" v-model="elemento.attivita">
                <ion-select-option v-for="ele in attivita" :key="ele.id" :value="ele.id">
                    {{ele.name}}
                </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label>Ragazzi</ion-label>
            <ion-select multiple="true" cancel-text="Annulla" ok-text="Conferma" v-model="elemento.raga">
                <ion-select-option v-for="ragazzo in ragazzi" :key="ragazzo.id" :value="ragazzo.id">
                    {{ragazzo.name}}
                </ion-select-option>
            </ion-select>
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
                  <ion-icon size="large" style="margin-right: 20px" name="link-outline"></ion-icon>
                  <ion-label>
                      <h2>Attività: {{item.attivita}}</h2>
                      <h3>Ragazzo: {{item.ragazzo}}</h3>
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
 IonLabel, IonItem, IonButton, IonList,  IonBadge, IonItemSliding, IonItemOptions, IonItemOption, toastController, IonIcon,
IonSelectOption, IonSelect} from '@ionic/vue';
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
          IonBadge,
          IonItemSliding,
          IonItemOptions,
          IonItemOption,
          IonIcon,
          IonSelectOption,
          IonSelect,
      },

      data(){
        return {
            elementi:[],
            attivita:[],
            ragazzi:[],
            elemento:{},
        }
      },

      mounted(){
          this.listaElementi();
          this.caricaAttivita();
          this.caricaRagazzi();
      },

      methods:{
          listaElementi(){
              this.axios.get(`${help().linkstassociazioni}`).then((response) => {
                  this.elementi = response.data;
              });
          },

            inserisci(){
                this.axios.post(`${help().linkaggiungistassociazione}`, this.elemento).then((response) => {
                    response.data.forEach(ele => {
                        this.elementi.unshift(ele);
                    })

                });
            },

          elimina(item){
              this.axios.delete(`${help().linkstassociazioni}`+'/'+item.id).then(() => {
                  this.elementi = this.elementi.filter(v => v.id !== item.id);
                  this.openToast('associazione eliminata');
              });
          },

          async openToast(messaggio){
              const toast = await toastController
                  .create({
                      message: messaggio,
                      duration: 2000,
                      color: 'danger'
                  });
              return toast.present();
          },

          caricaAttivita(){
              this.axios.get(`${help().linkattivita}`).then((response) => {
                  this.attivita = response.data;
              });
          },

          caricaRagazzi(){
              this.axios.get(`${help().linkragazzi}`).then((response) => {
                  this.ragazzi = response.data;
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
