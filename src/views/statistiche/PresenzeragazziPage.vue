<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Presenze Ragazzi</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
        <ion-item>
            <ion-label>Ragazzo</ion-label>
            <ion-select interface="popover" v-model="elemento.ragazzo">
                <ion-select-option v-for="ele in ragazzi" :key="ele.id" :value="ele.id">
                    {{ele.name}}
                </ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label>Mese</ion-label>
            <ion-select interface="popover" v-model="elemento.mese" >
                <ion-select-option :value="mese" v-for="mese in 12" :key="mese">{{mese}}</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <ion-label>Anno</ion-label>
            <ion-select interface="popover" v-model="elemento.anno" >
                <ion-select-option :value="2019 + anno" v-for="anno in numeroAnni" :key="anno">{{2019 + anno}}</ion-select-option>
            </ion-select>
        </ion-item>

        <ion-button @click="listaElementi()" size="large" expand="block" style="margin-bottom: 10px">Visualizza</ion-button>
        <div class="ion-text-center">
            <ion-badge color="danger" >swipe a sx per eliminare</ion-badge>
        </div>

        <ion-list v-for="(item, index) in elementi" :key="index">
            <ion-badge color="medium" style="width: 100%; height: 30px; padding-top: 10px">{{item[0].activity.name}}</ion-badge>

            <ion-item-sliding v-for="ele in item" :key="index+ele.id">
                <ion-item-options side="end">
                    <ion-item-option color="danger" @click="elimina(ele)">Elimina</ion-item-option>
                </ion-item-options>

                <ion-item>
                    <ion-icon size="large" style="margin-right: 20px" name="logo-angular"></ion-icon>
                    <ion-label>
                        <h3>Giorno: {{ele.giorno}}</h3>
                        <p>Quantità: {{ele.quantita}}</p>
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
IonSelectOption, IonSelect, } from '@ionic/vue';
import help from '@/help';

export default defineComponent({
      name: 'PresenzeragazziPage',

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
            ragazzi:[],
            elementi:[],
            elemento:{
                anno:new Date().getFullYear()
            }
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
          listaElementi(){
              this.axios.post(`${help().linkstatisticapresenzeragazzi}`, this.elemento).then((response) => {
                  this.elementi =  response.data[0];
                  //console.log(response.data)
                });
            },

          elimina(item){
            //  console.log(this.elementi.find((ele, key) => key === item.activity.id ))
              this.axios.delete(`${help().linkattivitaragazzo}`+'/'+item.id).then(() => {
                  this.listaElementi();
                  this.openToast(item);
              });
          },

          async openToast(){
              const toast = await toastController
                  .create({
                      message: 'presenza eliminata',
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
