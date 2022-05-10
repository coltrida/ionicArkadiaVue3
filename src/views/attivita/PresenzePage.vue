<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Presenze Attività</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <ion-item>
            <ion-label>Attività</ion-label>
            <ion-select interface="popover" v-model="elemento.attivita" @ionChange="selezionaAttivita()">
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
        <ion-item>
            <ion-label>Giorno:</ion-label>
            <ion-input type="date" v-model="elemento.giorno"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Quantita:</ion-label>
            <ion-input type="number" v-model="elemento.quantita"></ion-input>
            <ion-label>note:</ion-label>
            <ion-input type="number" v-model="elemento.note"></ion-input>
        </ion-item>

        <ion-button @click="inserisci()" size="large" expand="block" style="margin: 20px 0">Inserisci</ion-button>
        <div class="ion-text-center">
            <ion-badge color="danger" >swipe a sx per eliminare</ion-badge>
        </div>

        <ion-list>
          <ion-item-sliding v-for="item in elementi" :key="item.id">
              <ion-item-options side="end">
                  <ion-item-option color="danger" @click="elimina(item)">Elimina</ion-item-option>
              </ion-item-options>

              <ion-item>
                  <ion-icon size="large" style="margin-right: 10px" name="accessibility-outline"></ion-icon>
                  <ion-label>
                      <h2>Nome: {{item.ragazzo}}</h2>
                      <p>Attività: {{item.attivita}} </p>
                  </ion-label>
                  <ion-label>
                      <h2>Giorno: {{item.giorno}}</h2>
                      <p>Quantità: {{item.quantita}} </p>
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
 IonLabel, IonItem, IonButton, IonList,  IonBadge, IonItemSliding, IonItemOptions, IonItemOption, toastController,
IonSelectOption, IonSelect, IonIcon} from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'PresenzePage',

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
          IonSelectOption,
          IonSelect,
          IonIcon,
      },

      data(){
        return {
            apriModal:"false",
            elementi:[],
            attivita:[],
            operatori:[],
            ragazzi:[],
            elemento:{
                attivita:'',
                quantita:1,
                note:'',
                giorno:'',
                raga:[]
          }
        }
      },

      mounted(){
        this.listaElementi();
        this.caricaAttivita();
        this.caricaRagazzi();
      },

      methods:{
          listaElementi(){
              this.axios.get(`${help().linkattivitaragazzo}`).then((response) => {
                  this.elementi = response.data;
                });
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

            inserisci(){
              //console.log(this.elemento)
                this.axios.post(`${help().linkattivitaragazzo}`, this.elemento).then((response) => {
                 // console.log(response.data)
                    response.data.forEach(ele => {
                        this.elementi.unshift(ele);
                    });
                    /*this.elementi.unshift(response.data);*/
                    this.elemento = {
                            attivita:'',
                            quantita:1,
                            note:'',
                            giorno:'',
                            raga:[]
                    };
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
          },

          selezionaAttivita(){
              if (this.elemento.attivita !== 0) {
                  this.axios.get(`${help().linkattivitaragazzo}`+'/'+this.elemento.attivita).then((response) => {
                      this.elemento.raga = response.data
                  });
              }
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
