<template>

  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <v-row>
            <v-col md="6" sm="12" lg="6">
              <stat-box 
                :title="'Nombre total d\'utilisateurs actifs '"                
                :icon="'mdi-account-group-outline'"
                :nbr="'245'"
                :colorIcon="'#00ac47'"
                :colorText="'#00ac47'"
                :class="'custom-card-user  border-user'"
              >
              </stat-box>
            </v-col>
            <v-col md="6" sm="12" lg="6" >
              <stat-box 
                :title="'Nombre total de departements intervenu'"  
                :icon="'mdi-map'"
                :nbr="'245'"
                :colorIcon="'#007cf6'"
                :class="'custom-card-user  border-user'"
              >
              </stat-box>
            </v-col>
            <v-col md="6" sm="12" lg="6">
              <stat-box 
                :title="'Nombre total de région intervenu'"
                :icon="'mdi-map'"
                :nbr="'245'"
                :colorIcon="'#007cf6'"
                :class="'custom-card-user  border-user'"
              >
              </stat-box>
            </v-col>
            <v-col md="6" sm="12" lg="6">
              <stat-box 
                :title="'Nombre total de financement'"
                :icon="'mdi-credit-card'"
                :nbr="'245'"
                :colorIcon="'#ffba00'"
                :class="'custom-card-user  border-user'"
              >
              </stat-box>
            </v-col>
          </v-row>
      </v-container>        
    </v-card>
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
      //!this.$hasRole('admin') && this.getDashboardData()
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

</style>
