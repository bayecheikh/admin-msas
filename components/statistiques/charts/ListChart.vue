<template>
  <v-container pl-0>
    <v-row>
      <v-col md="12" lg="12" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <v-row class="d-flex align-items-center border-bottom-solid mb-6">
            <h2 class="mt-4 ml-6 card-title custom-font">Statistiques globales</h2><v-spacer></v-spacer>
            <h3 class="mt-4 card-title custom-font">Période du </h3>
            <v-col lg="4" sm="12" md="4">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="model.debut"
                    label=""
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="model.debut"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <h3 class="mt-4 card-title custom-font">au </h3>
            <v-col lg="4" sm="12" md="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="model.fin"
                    label=""
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="model.fin"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col> 
          </v-row>
          <v-row>
            <v-col md="6" lg="6" sm="12" class="custom-bloc-chart border-right-chart">
                <h4 class="card-title custom-font">Utilisateurs</h4 class="card-title custom-font">
                <BarChart :data="utilisateurData" :options="barChartOptions" :styles="{height: '400px', position: 'relative'}"/>
            </v-col> 
            <v-col md="6" lg="6" sm="12" class="custom-bloc-chart">
                <h4 class="card-title custom-font">Répartition des structures par region</h4 class="card-title custom-font">
                <BarChart :data="enrolementParSiteData" :options="barChartOptions" :styles="{height: '400px', position: 'relative',width:'100%'}"/>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import BarChart from "@/components/statistiques/charts/BarChart";
    export default {
        components: { BarChart,LeftMenu, },
        mounted: function() {
            //this.getListMission()
        },
        computed:{
            styles: function(){
                return {
                    'left':this.x+'px',
                    'top':this.y-70+'px'
                }
            }
        },
        data() {
            return {
                leftmenuItems:[
                { text: 'Accueil', icon: 'mdi-home-outline',link:'/dashboard',position:1  },
                { text: 'Demande', icon: 'mdi-file-document-outline',link:'/demandes',position:0 }
                ],
                 model: {                 
                  debut:'',
                  fin:'',
                },
                date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                menu1: false,
                menu2: false,
                siteUrl:process.env.siteUrl,
                missions: [],
                barChartOptions: {
                   scales: {
                        yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                        }],
                        xAxes: [{
                            ticks: {
                            fontSize: 12
                        },
                        gridLines: {
                            display: false
                        }
                        }]
                    },
                    legend: {
                        display: true,
                        position:'bottom',
                        align: "start"
                    },
                    responsive: true,
                    maintainAspectRatio: false
                },
                utilisateurData: {
                    labels:['Utilisateurs'],
                    datasets: [
                        {
                            label: "Actifs",
                            borderWidth: 2,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            data: [3]
                        },
                        {
                            label: "Innactifs",
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            data: [4]
                        },
                        {
                            label: "Bloqués",
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            data: [3]
                        }
                    ]
                },
                dossierPreTraitementData: {
                    labels:['Dossiers pré-traitement'],
                    datasets: [
                        {
                            label: "Soumis",
                            borderWidth: 2,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            data: [3]
                        },
                        {
                            label: "En traitement",
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            data: [4]
                        },
                        {
                            label: "Brouillon",
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            data: [3]
                        }
                    ]
                },
                dossierPostTraitementData: {
                    labels:['Dossier post-traitement'],
                    datasets: [
                        {
                            label: "Soumis",
                            borderWidth: 2,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            data: [3]
                        },
                        {
                            label: "En traitement",
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            data: [4]
                        },
                        {
                            label: "Brouillon",
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            data: [3]
                        },
                        {
                            label: "Livré à domicile",
                            borderWidth: 2,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            data: [3]
                        }
                    ]
                },
                enrolementParSiteData: {
                    labels:['DAKAR','THIES','LOUGA'],
                    datasets: [{
                        label: 'Nombre de structure',
                        borderWidth: 1,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        data: [40, 20, 12]
                      }
                    ]
                },
                demandeFinancementData: {
                    labels:['ESS DAKAR','ESS THIES','ESS LOUGA'],
                    datasets: [{
                        label: 'Nombre de demandes',
                        borderWidth: 1,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                      }
                    ]
                },
                demandeEmploiData: {
                    labels:['ESS DAKAR','ESS THIES','ESS LOUGA'],
                    datasets: [{
                        label: 'Nombre de demandes',
                        borderWidth: 1,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                      }
                    ]
                },
                demandeFormationData: {
                    labels:['ESS DAKAR','ESS THIES','ESS LOUGA'],
                    datasets: [{
                        label: 'Nombre de demandes',
                        borderWidth: 1,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                      }
                    ]
                },
            }
        },

        methods: {
            getListMission(){
                this.progress=true
                this.$axios.$get('/api/missions?_format=json')
                .then(async (response) => {
                    //this.$toast.success(response.message).goAway(2000)
                    console.log('Données Reçu ++++++: ', response)
                    this.missions = response

                }).catch((error) => {
                    console.log('Code error ++++++: ', error?.response?.data?.message)
                }).finally(() => {
                    console.log('Requette envoyé ')
                });
            }
        }
    };
</script>
<style scoped>
path {
  fill: #ffffff;
  cursor: pointer;
  -webkit-transition: all 150ms;
  -moz-transition: all 150ms;
  -o-transition: all 150ms;
  transition: all 150ms;
}
path:hover {
  opacity: 0.85;
}
.lan {
  fill-opacity: 1;
  stroke: rgb(0, 0, 0);
  stroke-opacity: 1;
  stroke-miterlimit:22.926;
  stroke-width: 0.5;
}

.description {
  pointer-events: none;
  position: absolute;
  font-size: 18px;
  text-align: center;
  background: rgba(255, 255, 255, 0.795);
  padding: 50px;
  padding-top: 15px;
  z-index: 5;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  color: #21669e;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #eee;
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.description.active {
  display: block;
}
.description:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  width: 0;
  height: 0;
  margin-left: -10px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #2E495E;
  letter-spacing: 1px;
  font-size: 6em;
}
.green {
  color: #00C48D;
}

.subtitle {
  font-weight: 300;
  font-size: 1em;
  color: #2E495E;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.custom-text-btn{
    font-size: 14px !important;
}
.custom-card-box {
  border: solid 2px #99A9B44A;
  padding: 27px;
  max-height: 100%;
}
.border-right {
  border-right: 1px;
}
.box{
    width: 100%;
}
.custom-bg-grey{
  background-color: #F2F2F2;
}
.custom-section{
    background-color: #EEF3FB;
}
.bg-white{
    background-color: #fff;
}
.custom-bloc-chart{
  padding: 26px;
}
.border-right-chart{
  border-right: solid 1px #aeb4b7;
  margin-bottom: 40px;
}
</style>
