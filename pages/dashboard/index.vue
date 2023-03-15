<template>
<div> 
    <div class="custom-container mt-5">
      <v-row class="d-flex justify-content-between">
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="">MONTANT TOTAL DE FINANCEMENT PRÉVU</h4>
            <h1 class="">{{(montantBienServicePrevus+montantInvestissementPrevus).toLocaleString()}}</h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="">MONTANT TOTAL DE FINANCEMENT MOBILISÉ</h4>
            <h1 class="">{{(montantBienServiceMobilises+montantInvestissementMobilises).toLocaleString()}}</h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="">MONTANT TOTAL DE FINANCEMENT EXECUTÉ</h4>
            <h1 class="">{{(montantBienServiceExecutes+montantInvestissementExecutes).toLocaleString()}}</h1>
          </div>
        </v-col>
        <v-col md="3" sm="12" lg="3" class="">
          <div class="bg-marron pl-4 pr-5 pt-5 pb-5 text-sm-center">
            <h4 class="color-yellow">NOMBRE TOTAL DE FINANCEMENT</h4>
            <h1 class="color-yellow">{{nombreFinancement}}</h1>
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

  export default {
    layout: "dashboard",
    components: {
      StatBox,
      LeftMenu,
      ListChart
    },
    mounted: function() {
      this.getFinancement()
      //!this.$hasRole('admin') && this.getDashboardData()
    },
    data () {
      return {
        montantBienServiceExecutes:0,
        montantBienServiceMobilises:0,
        montantBienServicePrevus:0,
        montantInvestissementExecutes:0,
        montantInvestissementMobilises:0,
        montantInvestissementPrevus:0,
        montantInvestissementPrevus:0,
        nombreFinancement:0,
        leftmenuItems: [
          { text: 'Accueil', icon: 'mdi-home-outline',link:'/dashboard',name:'voir_dashboard' },
          { text: 'Mon activite', icon: 'mdi-clock-outline',link:'/dashboard/monactivite',name:'voir_mon_activite' }
        ]
      }
    },
    methods:{
       getFinancement(){
        this.$msasApi.$get('/all_ligne_financements')
        .then(async (response) => { 

          console.log('Données reçu financement par activité  +++++++++++',response.data)
          var result = [];

        
          this.nombreFinancement = response.data.data?.length

          //Montant bien et service executé
          let total1 = 0
          response.data.data.map((item)=>{              
              total1+=parseInt(item.montantBienServicePrevus)
          })
          this.montantBienServicePrevus = total1

          //Montant bien et service mobilisé
          let total2 = 0
          response.data.data.map((item)=>{              
              total2+=parseInt(item.montantBienServiceMobilises)
          })
          this.montantBienServiceMobilises = total2

          //Montant bien et service executé
          let total3 = 0
          response.data.data.map((item)=>{              
              total3+=parseInt(item.montantBienServiceExecutes)
          })
          this.montantBienServiceExecutes = total3

          //Montant bien et service executé
          let total4 = 0
          response.data.data.map((item)=>{              
              total4+=parseInt(item.montantInvestissementPrevus)
          })
          this.montantInvestissementPrevus = total4

          //Montant bien et service executé
          let total5 = 0
          response.data.data.map((item)=>{              
              total5+=parseInt(item.montantInvestissementExecutes)
          })
          this.montantInvestissementExecutes = total5

          //Montant bien et service executé
          let total6 = 0
          response.data.data.map((item)=>{              
              total6+=parseInt(item.montantInvestissementMobilises)
          })
          this.montantInvestissementMobilises = total6
          
       

        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
            this.$toast.error(error?.response?.data?.message).goAway(3000)
        }).finally(() => {
          console.log('Requette envoyé ')
        });
        },
      getDashboardData(){
        this.$essApi.$get('/dashboard-employee')
        .then(async (response) => { 
          console.log('Données reçu+++++++++++',response)
              await this.$store.commit('dashboard/initdashboardData', response)
        }).catch((error) => {
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
          console.log('Requette envoyé ')
        });
      }
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
