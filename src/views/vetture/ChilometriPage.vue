<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Inserisci Chilometri</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <ion-item>
            <ion-label>Vettura</ion-label>
            <ion-select interface="popover" v-model="elemento.car">
                <ion-select-option v-for="ele in vetture" :key="ele.id" :value="ele.id">
                    {{ele.name}}
                </ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Km Iniziali: </ion-label>
            <ion-input type="number" v-model="elemento.kminiziali"></ion-input>
            <ion-label>Km Finali:</ion-label>
            <ion-input type="number" v-model="elemento.kmfinali"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label>Operatore</ion-label>
            <ion-select interface="popover" v-model="elemento.utente">
                <ion-select-option v-for="ute in operatori" :key="ute.id" :value="ute.id">
                    {{ute.name}}
                </ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Giorno:</ion-label>
            <ion-input type="date" v-model="elemento.giorno"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label>Ragazzi</ion-label>
            <ion-select multiple="true" cancel-text="Annulla" ok-text="Conferma" v-model="elemento.raga">
                <ion-select-option v-for="ragazzo in ragazzi" :key="ragazzo.id" :value="ragazzo.id">
                    {{ragazzo.name}}
                </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-button @click="inserisci()" size="large" expand="block" style="margin: 20px 0">Inserisci</ion-button>
        <div class="ion-text-center">
            <ion-badge color="danger" >swipe a sx per eliminare</ion-badge>
            <ion-badge color="success" >swipe a dx - vedi i passeggeri</ion-badge>
        </div>

        <ion-modal :is-open=apriModal>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Passeggeri</ion-title>
                    <ion-title slot="end" @click="chiudiModal()">Chiudi</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-list>
                    <ion-item v-for="ele in passeggeri" :key="ele.id">
                        <ion-avatar slot="start">
                            <img src="/assets/avatar.png" />
                        </ion-avatar>
                        <ion-label>
                            <h2>{{ele.nome}}</h2>
                        </ion-label>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-modal>

        <ion-list>
          <ion-item-sliding v-for="item in elementi" :key="item.id">
              <ion-item-options side="end">
                  <ion-item-option color="danger" @click="elimina(item)">Elimina</ion-item-option>
              </ion-item-options>

              <ion-item-options side="start">
                  <ion-item-option color="success" @click="listaPasseggeri($event, item)">Passeggeri</ion-item-option>
              </ion-item-options>

              <ion-item>
                  <ion-icon size="large" style="margin-right: 20px" name="logo-angular"></ion-icon>
                  <ion-label>
                      <h2>Vettura: {{item.vettura}}</h2>
                      <h3>Operatore: {{item.operatore}}</h3>
                      <p>Km: {{item.kmPercorsi}} </p>
                  </ion-label>
                  <ion-label>
                      <h2>Giorno: {{item.giorno}}</h2>
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
IonSelectOption, IonSelect, IonModal, IonAvatar} from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'ChilometriPage',

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
          IonSelect,
          IonModal,
          IonAvatar,
      },

      data(){
        return {
            apriModal:"false",
            elementi:[],
            vetture:[],
            operatori:[],
            passeggeri:[],
            ragazzi:[],
            elemento:{
                car:'',
                kminiziali:'',
                kmfinali:'',
                utente:'',
                giorno:'',
                raga:[]
          }
        }
      },

      mounted(){
        this.listaElementi();
        this.caricaVetture();
        this.caricaOperatori();
        this.caricaRagazzi();
      },

      methods:{
          listaElementi(){
              this.axios.get(`${help().linklistachilometrivetture}`).then((response) => {
                  this.elementi = response.data;
                });
            },

          caricaVetture(){
              this.axios.get(`${help().linkvetture}`).then((response) => {
                  this.vetture = response.data;
              });
          },

          caricaOperatori(){
              this.axios.get(`${help().linkoperatori}`).then((response) => {
                  this.operatori = response.data;
              });
          },

          caricaRagazzi(){
              this.axios.get(`${help().linkragazzi}`).then((response) => {
                  this.ragazzi = response.data;
              });
          },

            inserisci(){
             // console.log(this.elemento)
                this.axios.post(`${help().linkinserisciviaggio}`, this.elemento).then((response) => {
                  this.elementi.unshift(response.data);
                    this.elemento = {};
                });
            },

          elimina(item){
              this.axios.delete(`${help().linklistachilometrivetture}`+'/'+item.id).then(() => {
                  this.elementi = this.elementi.filter(v => v.id !== item.id);
                  this.openToast();
              });
          },

          async openToast(){
              const toast = await toastController
                  .create({
                      message: 'viaggio eliminato',
                      duration: 2000,
                      color: 'danger'
                  });
              return toast.present();
          },

          listaPasseggeri(e, item){
              e.target.parentNode.parentNode.close();
              this.passeggeri = item.passeggeri;
              this.apriModal = "true";
          },

          chiudiModal(){
              this.apriModal = "false";
              this.passeggeri = [];
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
