<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Saldo {{mese}}</ion-title>
          <ion-buttons slot="end">
          <ion-button @click="indietro()">
              <ion-icon size="large" name="arrow-back-circle-outline"></ion-icon>
          </ion-button>
          <ion-button @click="avanti()">
              <ion-icon size="large" name="arrow-forward-circle-outline"></ion-icon>
          </ion-button>
          </ion-buttons>
      </ion-toolbar>
    </ion-header>

      <ion-content>
          <div class="ion-text-center">
              <ion-badge color="danger" >swipe a sx per eliminare</ion-badge>
          </div>

          <ion-grid>
              <ion-row>
                  <ion-col>
                      <div>
                          <ion-card>
                              <ion-card-header>
                                  <ion-card-title>Entrate</ion-card-title>
                                  <ion-card-subtitle>€ {{totEntrate}}</ion-card-subtitle>
                              </ion-card-header>
                          </ion-card>
                      </div>
                  </ion-col>
                  <ion-col>
                      <div>
                          <ion-card>
                              <ion-card-header>
                                  <ion-card-title>Saldo</ion-card-title>
                                  <ion-card-subtitle>€ {{saldo}}</ion-card-subtitle>
                              </ion-card-header>
                          </ion-card>
                      </div>
                  </ion-col>
                  <ion-col>
                      <div>
                          <ion-card>
                              <ion-card-header>
                                  <ion-card-title>Uscite</ion-card-title>
                                  <ion-card-subtitle>€ {{totUscite}}</ion-card-subtitle>
                              </ion-card-header>
                          </ion-card>
                      </div>
                  </ion-col>
              </ion-row>
          </ion-grid>

          <ion-list>
              <ion-item-sliding v-for="item in elementi" :key="item.id">
                  <ion-item-options side="end">
                      <ion-item-option color="danger" @click="elimina(item)">Elimina</ion-item-option>
                  </ion-item-options>

                  <ion-item :color="item.tipo === 'entrata' ? 'success' : 'warning'">
                      <ion-label :style="item.tipo === 'entrata' ? 'padding-left:0' : 'padding-left:100px'">
                          <h2>Data: {{item.giorno}} - Importo: € {{item.importo}}</h2>
                          <p>
                              Causale:  {{item.causale}}
                              <span v-if="item.tipo === 'entrata'"> - Eseguito: {{item.fornitore}}</span>
                          </p>
                      </ion-label>
                  </ion-item>
              </ion-item-sliding>
          </ion-list>
      </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonItem,
    IonButton, IonBadge, IonItemOption, IonItemOptions, IonIcon, IonItemSliding, IonList, IonCard, IonCardTitle,
    IonCardSubtitle, IonCardHeader, IonRow, IonCol, IonGrid, toastController
} from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'UscitaPage',

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
          IonBadge,
          IonItemOption,
          IonItemOptions,
          IonIcon,
          IonItemSliding,
          IonList,
          IonCard,
          IonCardTitle,
          IonCardSubtitle,
          IonCardHeader,
          IonRow,
          IonCol,
          IonGrid
      },

  data(){
    return {
        elementi:[],
        numero: 0,
        mese:'',
        totEntrate:'',
        totUscite:'',
        saldo:'',
    }
  },

    mounted(){
        this.listaElementi();
       // console.log(this.$route.params.direzione );
    },

  methods:{
      listaElementi(){
          this.axios.get(`${help().linksaldomese}`+'/'+this.numero).then((response) => {
              //this.elementi = response.data;
              this.mese = response.data[2]+'/'+response.data[1];
              this.elementi = response.data[0].data;
              this.totEntrate = response.data[3].toFixed(2);
              this.totUscite = response.data[4].toFixed(2);
              this.saldo = response.data[5].toFixed(2);
             // console.log(response.data)
          });
      },

      avanti(){
          this.elementi = [];
          this.numero ++;
          this.listaElementi();
      },

      indietro(){
          this.elementi = [];
          this.numero --;
          this.listaElementi();
      },

      elimina(item){
          this.axios.delete(`${help().linkeliminaprimanota}`+'/'+item.id).then(() => {
              this.elementi = this.elementi.filter(v => v.id !== item.id);
              this.openToast();
          });
      },

      async openToast(){
          const toast = await toastController
              .create({
                  message: 'elemento eliminato',
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

</style>
