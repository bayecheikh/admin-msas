<template>
  <v-container pl-0>
    <v-row>
      <v-col md="12" lg="12" sm="12" class="">
          <v-row class="d-flex align-items-center mb-6 bg-marron pl-6 py-6 pr-6">
            <v-col md="6" lg="6" sm="12" class="border-right-chart">
                <h4 class="card-title custom-font">Répartition par dimension</h4 class="card-title custom-font">
                <BarChart :data="dimensionData" :options="barChartOptions" :styles="{height: '400px', position: 'relative'}"/>
            </v-col> 
            <v-col md="6" lg="6" sm="12" class="">
                <h4 class="card-title custom-font">Répartition par région</h4 class="card-title custom-font">
                <BarChart :data="regionData" :options="barChartOptions" :styles="{height: '400px', position: 'relative',width:'100%'}"/>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import BarChart from "@/components/statistiques/charts/BarChart";
import { mapMutations, mapGetters } from 'vuex'
    export default {
        components: { BarChart,LeftMenu, },
        mounted: function() {
            //this.getListMission()
        },
        computed: {
        ...mapGetters({
        dashboardData: 'dashboard/dashboardData',
        loading : 'dashboard/loading', 
        listannees: 'annees/listannees',
        //listmonnaies: 'monnaies/listmonnaies',
        listdimensions: 'dimensions/listdimensions',
        listregions: 'regions/listregions',
        //listmodefinancements: 'modefinancements/listmodefinancements',
        listpiliers: 'piliers/listpiliers',
        //listbailleurs: 'bailleurs/listbailleurs',
        liststructures: 'structures/selectliststructures',
        listsources: 'sources/listsources',   
        })},
        data() {
            return {
                leftmenuItems:[
                { text: 'Accueil', icon: 'mdi-home-outline',link:'/dashboard',position:1  },
                { text: 'Demande', icon: 'mdi-file-document-outline',link:'/demandes',position:0 }
                ],
                 model: {                 
                  debut:'2012-01-01',
                  fin:'2022-10-20',
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
                dimensionData: {
                  labels:['Mobilisation de ressources','Mise en commun de ressources','Achat de services'],
                    datasets: [{
                        label: 'Montant total des financements ',
                        borderWidth: 1,
                        backgroundColor: '#097fb5ac',
                        data: [20000000, 15000000, 17000000]
                      }
                    ]
                },
                regionData: {
                    labels:['DAKAR','THIES','LOUGA','FATICK','SAINT-LOUIS'],
                    datasets: [{
                        label: 'Montant total des financements ',
                        borderWidth: 1,
                        backgroundColor: '#047586c1',
                        data: [20000000, 13000000, 10000000,11000000,9000000]
                      }
                    ]
                }
            }
        },

        methods:{
        getDataByDimensionEtSource(){
          this.$msasApi.$get('/allStats')
          .then(async (response) => { 
            console.log('Données reçu+++++++++++',response)
                let dataFinancement = this.dashboardData
                let labels = ["Etat", "PTF", "Collectivités territoriales(CT)","ONG et associations","Secteur privé sanitaire","Secteur privé non sanitaire"]
                
                let dataMobilisationRessource = this.dashboardData?.filter(investissement => investissement.dimension[0]?.libelle_dimension === 'Mobilisation de ressources')
                
                let engagement = 0
                let mobilisation = 0
                let execution = 0

                
                await response.data.data.map((item)=>{
                  //Engagement
                  let montantBienServicePrevus = parseInt(item.montantBienServicePrevus)
                  let montantInvestissementPrevus = parseInt(item.montantInvestissementPrevus)
                  engagement = engagement + montantBienServicePrevus + montantInvestissementPrevus

                  //Mobilisation
                  let montantBienServiceMobilises = parseInt(item.montantBienServiceMobilises)
                  let montantInvestissementMobilises = parseInt(item.montantInvestissementMobilises)
                  mobilisation = mobilisation + montantBienServiceMobilises + montantInvestissementMobilises

                  //Execution
                  let montantBienServiceExecutes = parseInt(item.montantBienServiceExecutes)
                  let montantInvestissementExecutes = parseInt(item.montantInvestissementExecutes)
                  execution = execution + montantBienServiceExecutes + montantInvestissementExecutes
                })

                let data = {financePrevus:engagement,financeMobilises:mobilisation,financeExecutes:execution,total:total}
              //console.log('dashboard data +++++ ',data)
              await this.$store.commit('dashboard/initdashboardData', data)
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
.bg-marron{
  border-radius: 5px;
  background-color: #fff;
}
</style>
