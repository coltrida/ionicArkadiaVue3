<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Agricoltura</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Agricoltura</ion-title>
                </ion-toolbar>
            </ion-header>

                <ion-card style="margin:0;">
                    <ion-card-content>
                        <calendar is-expanded :attributes="attributes" @update:from-page="spostati($event)" @dayclick="onDayClick" />
                        <ion-item>
                            <ion-label>Ragazzo</ion-label>
                            <ion-select interface="popover" v-model="elemento.utente">
                                <ion-select-option v-for="ute in ragazzi" :key="ute.id" :value="ute.id">
                                    {{ute.name}}
                                </ion-select-option>
                            </ion-select>
                        </ion-item>
                        <ion-radio-group v-model="elemento.tipologia">
                            <ion-list-header>
                                <ion-label>Tipologia</ion-label>
                            </ion-list-header>

                            <ion-item>
                                <ion-label>Presenza</ion-label>
                                <ion-radio slot="start" value="P"></ion-radio>
                            </ion-item>

                            <ion-item>
                                <ion-label>Assenza</ion-label>
                                <ion-radio slot="start" value="A"></ion-radio>
                            </ion-item>
                        </ion-radio-group>
                    </ion-card-content>
                    <ion-button expand="block" size="large" @click="inserisci()">inserisci</ion-button>

                    <ion-list>
                        <ion-item
                                v-for="item in risultati"
                                :key="item.it"
                                :color="item.presenza === 'Presente' ? 'success' : 'danger'"
                        >
                            <ion-avatar slot="start">
                                <img src="/assets/avatar.png" />
                            </ion-avatar>
                            <ion-label>
                                <h2>{{item.client.name}}</h2>
                                <h3>{{item.giorno}}</h3>
                                <p>{{item.presenza}}</p>
                            </ion-label>
                        </ion-item>
                    </ion-list>

                </ion-card>

        </ion-content>
    </ion-page>
</template>

<script>
    import { defineComponent } from 'vue';
    import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,
        IonCard, IonCardContent, IonButton, IonListHeader, IonLabel, IonItem,
        IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonAvatar, IonList} from '@ionic/vue';
    import 'v-calendar/dist/style.css';
    import {  Calendar  } from 'v-calendar';
    import help from '@/help';

    export default defineComponent({
        name: 'AgricolturaPage',
        components: {
            IonButtons,
            IonContent,
            IonHeader,
            IonMenuButton,
            IonPage,
            IonTitle,
            IonToolbar,
            IonCard,
            IonCardContent,
            IonButton,
            IonListHeader,

            Calendar,
            IonLabel,
            IonItem,
            IonRadio,
            IonRadioGroup,
            IonSelect,
            IonSelectOption,
            IonAvatar,
            IonList
        },
        data(){
            return {
                anno:'',
                mese:'',
                ragazzi:[],
                elemento:{
                    giorno:[],
                    tipologia:'',
                    utente:''
                },
                risultati:[],
                todos: [
                    {
                        description: 'Take Noah to basketball practice.',
                        isComplete: false,
                        dates: { weekdays: 6 }, // Every Friday
                        color: 'red',
                    },
                ],
            }
        },
        mounted() {
            this.caricaRagazzi();
            let giorno = new Date();
          //  this.caricaAgricoltura(giorno);
        },
        methods:{
            caricaRagazzi(){
                this.axios.get(`${help().linkragazzi}`).then((response) => {
                    this.ragazzi = response.data;
                });
            },

            caricaAgricoltura(anno, mese){
                this.axios.get(`${help().linkcaricaagricolturameseanno}`+'/'+mese+'/'+anno).then((response) => {
                    this.risultati = response.data;
                });
            },

            onDayClick(day) {
                const idx = this.elemento.giorno.findIndex(d => d.id === day.id);
                if (idx >= 0) {
                    this.elemento.giorno.splice(idx, 1);
                } else {
                    this.elemento.giorno.push({
                        id: day.id,
                        date: day.date,
                    });
                }
                // console.log(this.elemento.giorno)
            },

            inserisci(){
              //  console.log(this.elemento);
                this.axios.post(`${help().linkcaricaagricoltura}`, this.elemento).then((response) => {
                    this.elemento.giorno = [];
                    this.elemento.tipologia = '';
                    this.elemento.utente = '';
                    this.caricaAgricoltura(this.anno, this.mese);
                });
            },

            spostati(e){
              //  console.log(e);
                this.anno = e.year;
                this.mese = e.month;
                this.caricaAgricoltura(this.anno, this.mese);
            }

        },
        computed:{
            incId(){
                return this.todos.length;
            },

            dates() {
                return this.elemento.giorno.map(day => day.date);
            },
            attributes() {
                return this.dates.map(date => ({
                    highlight: true,
                    dates: date,
                }));
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
</style>
