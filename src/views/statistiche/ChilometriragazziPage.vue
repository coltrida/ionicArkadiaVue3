<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Chilometri Ragazzi</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <ion-item>
            <ion-label>Ragazzo</ion-label>
            <ion-select interface="popover" v-model="elemento.ragazzo">
                <ion-select-option v-for="ute in ragazzi" :key="ute.id" :value="ute.id">
                    {{ute.name}}
                </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label>Mesi</ion-label>
            <ion-select multiple="true" cancel-text="Annulla" ok-text="Conferma" v-model="elemento.mesi">
                <ion-select-option v-for="mesesel in 12" :key="mesesel" :value="mesesel">
                    {{mesesel}}
                </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label>Anno</ion-label>
            <ion-select interface="popover" v-model="elemento.anno" >
                <ion-select-option :value="2019 + anno" v-for="anno in numeroAnni" :key="anno">{{2019 + anno}}</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-button @click="visualizza()" size="large" expand="block" style="margin-bottom: 10px">Visualizza</ion-button>
        <!--<div class="ion-text-center">
            <ion-badge color="danger" >swipe a sx per eliminare</ion-badge>
            <ion-badge color="success" >swipe a dx - vedi i passeggeri</ion-badge>
        </div>-->

        <!--<ion-modal :is-open=apriModal>
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
        </ion-modal>-->
        <ion-grid>
            <ion-row>
                <ion-col>
                    {{totChilometri}}
                </ion-col>
                <ion-col>
                    {{totCosto}}
                </ion-col>
            </ion-row>
        </ion-grid>

        <ion-list>
          <ion-item-sliding v-for="item in elementi" :key="item.id">
              <!--<ion-item-options side="end">
                  <ion-item-option color="danger" @click="elimina(item)">Elimina</ion-item-option>
              </ion-item-options>

              <ion-item-options side="start">
                  <ion-item-option color="success" @click="listaPasseggeri($event, item)">Passeggeri</ion-item-option>
              </ion-item-options>-->

              <ion-item>
                  <ion-icon size="large" style="margin-right: 20px" name="airplane-outline"></ion-icon>
                  <ion-label>
                      <h2>Giorno: {{item.giorno}}</h2>
                      <h3>Km percorsi: {{item.kmPercorsi}}</h3>
                      <p>Operatore: {{item.operatore}}</p>
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
IonSelectOption, IonSelect, IonGrid, IonRow, IonCol} from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'ChilometriragazziPage',

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
          IonGrid,
          IonRow,
          IonCol
      },

      data(){
        return {
            apriModal:"false",
            elementi:[],
            ragazzi:[],
            elemento:{
                anno:new Date().getFullYear()
            },
            totChilometri:'',
            totCosto:'',
        }
      },

    computed:{
        numeroAnni(){
            return new Date().getFullYear() - 2019;
        }
    },

      mounted(){
          this.caricaRagazzi();
      },

      methods:{
            visualizza(){
                this.axios.post(`${help().linkstatisticachilometriragazzi}`, this.elemento).then((response) => {
                  //console.log(response.data)
                    this.elementi = response.data[0];
                    this.totChilometri = 'Chilometri totali: ' + response.data[1];
                    this.totCosto = 'Costo: €' + (response.data[1] * 0.45).toFixed(2);
                  if (this.elementi.length === 0){
                      this.openToast('Nessun viaggio')
                  }
                });
            },

          /*elimina(item){
              this.axios.delete(`${help().linklistachilometrivetture}`+'/'+item.id).then(() => {
                  this.elementi = this.elementi.filter(v => v.id !== item.id);
                  this.openToast('viaggio eliminato');
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

          caricaRagazzi(){
              this.axios.get(`${help().linkragazzi}`).then((response) => {
                  this.ragazzi = response.data;
              });
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
