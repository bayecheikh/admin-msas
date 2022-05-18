<template>
  <v-container pl-0>
    <v-row>
      <v-col md="2" lg="2" sm="12" >
        <v-container pl-0>
          <left-menu :items="leftmenuItems"></left-menu>
        </v-container>
      </v-col>

      <v-col md="10" lg="10" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <v-row align="left"
            justify="left">
            <v-col cols="12" md="12" lg="12" sm="12">
              <form-update-demande></form-update-demande>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormUpdateDemande from '@/components/demandes/modifier/FormUpdateDemande';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormUpdateDemande
    },
    data () {
      return {
        leftmenuItems:[
          { text: 'Accueil', icon: 'mdi-home',link:'/dashboard/charge-clientel',position:1  },
          { text: 'Nouvelle demande', icon: 'mdi-account-plus-outline',link:'/demandes/addDemande',position:0 }
        ],
        headerItems: [
        {
          text: 'Demandes',
          disabled: false,
          to: '/demandes',
          exact: true
        },
        {
          text: 'Modifier demande',
          disabled: true,
          to: '/demandes/addDemande',
          exact: true
        }
        
        ],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date3: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        menu3: false,
        modal: false,
        roles: ['Sperviseur national'],
        localisations: ['Thiès','Dakar'],

      }
    }

  }
</script>

<style scoped>

</style>
