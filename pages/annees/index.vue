<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-annee></list-annee>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListAnnee from '@/components/annees/ListAnnee'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-annees')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListAnnee
    },
    mounted: function() {
      this.$store.dispatch('annees/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'annees', icon: 'mdi-lock',link:'/annees',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des annees',
            disabled: true,
            to: '/annees',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
