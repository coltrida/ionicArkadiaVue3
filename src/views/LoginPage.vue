<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Login</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <form>
          <ion-item>
            <ion-label >Username:</ion-label>
            <ion-input v-model="elemento.email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label >Password</ion-label>
            <ion-input type="password" v-model="elemento.password"></ion-input>
          </ion-item>
          <ion-button @click="eseguiLogin()" size="large" expand="block" style="margin-bottom: 10px">Login</ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput,
  IonButton, toastController
} from '@ionic/vue';
import help from '@/help';

export default defineComponent({
  name: 'LoginPage',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  },
  data(){
    return {
      elemento:{}
    }
  },
  mounted() {
    if(sessionStorage.getItem('user')){
      this.$router.push('/');
    }
  },

  methods:{
    eseguiLogin(){
      this.axios.post(`${help().linklogin}`, this.elemento).then((response) => {
        //console.log(response.data)
        if (typeof response.data === 'string' ){
          this.openToast(response.data)
        } else {
          sessionStorage.setItem('user', response.data.name);
          sessionStorage.setItem('role', response.data.role);
          sessionStorage.setItem('id', response.data.id);
          location.reload();
        }
        //
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
</style>
