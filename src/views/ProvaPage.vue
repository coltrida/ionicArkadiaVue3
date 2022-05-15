<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Prova</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">rpova</ion-title>
                </ion-toolbar>
            </ion-header>


                <ion-card style="margin:0">
                    <img src="/assets/home.jpg"/>
                    <ion-card-header>
                        <ion-card-title>Prova</ion-card-title>
                    </ion-card-header>
                    <ion-button @click="printCurrentPosition()">get local</ion-button>
                    <ion-card-content style="margin-top: 52px" v-if="coordinate.coords">
                        {{coordinate.coords.latitude.toFixed(15) - coordinate.coords.longitude.toFixed(15)}}
<!--                        <iframe src="https://www.google.com/maps/embed?pb=!4v1652569339152!6m8!1m7!1sdz3-MNnOaS1hcuFHltlTEw!2m2!1d{{coordinate.coords.latitude}}!2d{{coordinate.coords.longitude}}!3f274.41500473982165!4f-6.811158656674735!5f0.7820865974627469" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>-->
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.7465336116807!2d{{coordinate.coords.longitude.toFixed(15)}}!3d{{coordinate.coords.latitude.toFixed(15)}}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x43640bd32bb9c4fe!2zNDPCsDMyJzU3LjYiTiAxMcKwMzUnMDguNCJF!5e0!3m2!1sit!2sit!4v1652614630042!5m2!1sit!2sit" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </ion-card-content>
                </ion-card>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { Geolocation } from '@capacitor/geolocation';
    import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
        IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonButton} from '@ionic/vue';

    export default defineComponent({
        name: 'ProvaPage',
        components: {
            IonButtons,
            IonContent,
            IonHeader,
            IonMenuButton,
            IonPage,
            IonTitle,
            IonToolbar,
            IonCard,
            IonCardTitle,
            IonCardHeader,
            IonCardContent,
            IonButton
        },
        data(){
            return {
                coordinate:{}
            }
        },
        methods:{
            async printCurrentPosition(){
                this.coordinate = await Geolocation.getCurrentPosition();
                console.log('Current position:', await Geolocation.getCurrentPosition());
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
