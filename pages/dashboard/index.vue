<template>
  <div>Dashboard</div>
</template>

<script>
import NbrDemandeActe from '@/components/statistiques/ministatistiques/accueil/NbrDemandeActe';
import LeftMenu from '@/components/LeftMenu';
import Banner from '@/components/dashboard/admin/Banner';
import NbrUserActif from '@/components/dashboard/admin/NbrUserActif';
import ActiviteUser from '@/components/dashboard/admin/ActiviteUser';
import ModuleGouvernance from '@/components/dashboard/admin/ModuleGouvernance';

import MontantPayement from '@/components/dashboard/charge-clientel/MontantPayement';
import NbrCompteUsager from '@/components/dashboard/charge-clientel/NbrCompteUsager';
import NbrDemande from '@/components/dashboard/charge-clientel/NbrDemande';
import NbrDossierDelivre from '@/components/dashboard/charge-clientel/NbrDossierDelivre';
import TicketHelpDesk from '@/components/dashboard/charge-clientel/TicketHelpDesk';

  export default {
    layout: "dashboard",
    components: {
      NbrDemandeActe,
      LeftMenu,
      Banner,
      NbrUserActif,
      ActiviteUser,
      ModuleGouvernance,

      MontantPayement,
      NbrCompteUsager,
      NbrDossierDelivre,
      TicketHelpDesk,
      NbrDemande
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
