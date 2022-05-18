<template>
  <v-container pl-0>
    <v-row>
      <v-col md="2" lg="2" sm="12">
        <v-container pl-0>
          <left-menu :items="leftmenuItems"></left-menu>
        </v-container>
      </v-col>
      <v-col md="9" lg="9" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <v-row>
            <v-col md="6" lg="6" sm="12">
                <BarChart :data="barChartData" :options="barChartOptions" :styles="{height: '400px', position: 'relative'}"/>
            </v-col> 
            <v-col md="6" lg="6" sm="12">
                <BarChart :data="barChartData" :options="barChartOptions" :styles="{height: '400px', position: 'relative',width:'100%'}"/>
            </v-col>
            <v-col md="6" lg="6" sm="12">
                <BarChart :data="barChartData" :options="barChartOptions" :styles="{height: '400px', position: 'relative',width:'100%'}"/>
            </v-col>
            <v-col md="6" lg="6" sm="12">
                <BarChart :data="barChartData" :options="barChartOptions" :styles="{height: '400px', position: 'relative',width:'100%'}"/>
            </v-col>
            <v-col md="6" lg="6" sm="12">
                <BarChart :data="barChartData" :options="barChartOptions" :styles="{height: '400px', position: 'relative',width:'100%'}"/>
            </v-col>
            <v-col md="6" lg="6" sm="12">
                <BarChart :data="barChartData" :options="barChartOptions" :styles="{height: '400px', position: 'relative',width:'100%'}"/>
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
                siteUrl:process.env.siteUrl,
                missions: [],
                barChartData: {
                    labels:['Dossier'],
                    datasets: [
                        {
                            label: "Soumis",
                            backgroundColor: "#0034CC",
                            data: [3]
                        },
                        {
                            label: "En traitement",
                            backgroundColor: "yellow",
                            data: [4]
                        },
                        {
                            label: "Brouillon",
                            backgroundColor: "#4eb7eb",
                            data: [3]
                        },
                        {
                            label: "Livré à domicile",
                            backgroundColor: "#4eb7eb",
                            data: [3]
                        }
                    ]
                },
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
</style>
