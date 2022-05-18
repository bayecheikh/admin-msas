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
          <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-demande></info-demande>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-demande></actions-demande>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoDemande from '@/components/demandes/detail/InfoDemande';
import ActionsDemande from '@/components/demandes/detail/ActionsDemande';

  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoDemande,
      ActionsDemande
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
          text: 'Detail',
          disabled: true,
          to: '/demandes/detail',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
