<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Inserisci Presenza Operatore</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-item>
                <ion-label>Inserisci Giorno:</ion-label>
                <ion-input type="date" v-model="elemento.giorno"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Inserisci Ore:</ion-label>
                <ion-input type="number" v-model="elemento.ore"></ion-input>
            </ion-item>

            <ion-button @click="inserisci()" size="large" expand="block" style="margin-bottom: 10px">Inserisci
            </ion-button>

            <div class="ion-text-center">
                <ion-badge color="danger">swipe a sx per eliminare</ion-badge>
            </div>

            <ion-list>
                <ion-item-sliding v-for="item in elementi" :key="item.id">
                    <ion-item-options side="end">
                        <ion-item-option color="danger" @click="elimina(item)">Elimina</ion-item-option>
                    </ion-item-options>

                    <ion-item>
                        <ion-icon size="large" style="margin-right: 20px" name="time-outline"></ion-icon>
                        <ion-label>
                            <h2>Giorno: {{item.giorno}}</h2>
                            <h3>Ore: {{item.ore}}</h3>
                        </ion-label>
                    </ion-item>
                </ion-item-sliding>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
    import {defineComponent} from 'vue';
    import {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput,
        IonLabel, IonItem, IonButton, IonList, IonBadge, IonItemSliding, IonItemOptions, IonItemOption, toastController,
        IonIcon
    } from '@ionic/vue';
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
            IonIcon
        },

        data() {
            return {
                elementi: [],
                elemento: {
                    id: 1,
                    giorno: '',
                    ore: '',
                }
            }
        },

        mounted() {
            this.listaElementi();
        },

        methods: {
            listaElementi() {
                this.axios.get(`${help().linkpresenzeoperatori}`+'/1').then((response) => {
                    this.elementi = response.data;
                    //console.log(this.ragazzi)
                });
            },

            inserisci() {
                this.axios.post(`${help().linkpresenzeoperatori}`, this.elemento).then((response) => {
                    this.elementi.unshift(response.data);
                    this.elemento = {};
                });
            },

            elimina() {
                /*this.axios.delete(`${help().linkragazzi}`+'/'+item.id).then(() => {
                    this.elementi = this.elementi.filter(v => v.id !== item.id);
                    this.openToast(item);
                });*/
            },

            async openToast(item) {
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
