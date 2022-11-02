<template>
  <div> 
      <div class="custom-container mt-5">
        <v-row class="d-flex justify-content-between">
          <v-col md="3" sm="12" lg="3" class="">
            <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
              <h4 class="">MONTANT TOTAL DE FINANCEMENT PRÉVU</h4>
              <h1 class="">{{ dashboardData && Number(dashboardData.financePrevus).toLocaleString() || 0}}</h1>
            </div>
          </v-col>
          <v-col md="3" sm="12" lg="3" class="">
            <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
              <h4 class="">MONTANT TOTAL DE FINANCEMENT MOBILISÉ</h4>
              <h1 class="">{{dashboardData && Number(dashboardData.financeMobilises).toLocaleString() || 0}}</h1>
            </div>
          </v-col>
          <v-col md="3" sm="12" lg="3" class="">
            <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
              <h4 class="">MONTANT TOTAL DE FINANCEMENT EXECUTÉ</h4>
              <h1 class="">{{dashboardData && Number(dashboardData.financeExecutes).toLocaleString() || 0}}</h1>
            </div>
          </v-col>
          <v-col md="3" sm="12" lg="3" class="">
            <div class="bg-marron pl-4 pr-5 pt-5 pb-5 text-sm-center">
              <h4 class="color-yellow">NOMBRE TOTAL DE FINANCEMENT EXECUTÉ</h4>
              <h1 class="color-yellow">{{dashboardData && dashboardData.total || 0}}</h1>
            </div>
          </v-col>
        </v-row>  
      </div> 
      <div class="custom-container mt-5 mr-8 ml-8 pl-4 pr-1 pt-5 pb-5">     
        <list-chart></list-chart>    
      </div> 
    </div>
  </template>
  
  <script>
  import ListChart from '@/components/statistiques/charts/ListChart';
  import LeftMenu from '@/components/LeftMenu';
  import StatBox from '@/components/dashboard/admin/StatBox';
  import { mapMutations, mapGetters } from 'vuex'
  
    export default {
      layout: "dashboard",
      components: {
        StatBox,
        LeftMenu,
        ListChart
      },
      computed: {
      ...mapGetters({
      dashboardData: 'dashboard/dashboardData',
      loading : 'dashboard/loading',    
      })},
      mounted: function() {
        //this.getDashboardData()
      },
      data () {
        return {
          leftmenuItems: [
            { text: 'Accueil', icon: 'mdi-home-outline',link:'/dashboard',name:'voir_dashboard' },
            { text: 'Mon activite', icon: 'mdi-clock-outline',link:'/dashboard/monactivite',name:'voir_mon_activite' }
          ]
        }
      },
      methods:{
        /* getDashboardData(){
          this.$msasApi.$get('/allStats')
          .then(async (response) => { 
            console.log('Données reçu+++++++++++',response)
  
                let engagement = 0
                let mobilisation = 0
                let execution = 0
                let total = response.data.data.length

                
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
        } */
      }
    }
  </script>
  
  <style scoped>
  .bg-marron {
    background-color: #047486;
    border-radius: 5px;
    padding: 30px;
    color: rgba(255, 255, 255, 0.941);
  }
  .bg-marron:hover {
    background-color: #fff;
    color: #045d86 !important;
  }
  .color-white{
    color: #fff;
  }
  .border-right-solid{
    border-right: solid 1px #ffffff59;
    padding: 20px;
  }
  
  </style>
  