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
          <list-demande></list-demande>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
  import LeftMenu from '@/components/LeftMenu';
  import PageHeader from '@/components/PageHeader';
  import ListDemande from '@/components/demandes/ListDemande'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer_dossiers')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListDemande
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems:[
          { text: 'Accueil', icon: 'mdi-home-outline',link:'/dashboard',position:1  },
          { text: 'Nouvelle demande', icon: 'mdi-account-plus-outline',link:'/demandes/addDemande',position:0 }
        ],
        headerItems: [
          {
            text: 'Liste des demandes',
            disabled: true,
            to: '/demandes',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
