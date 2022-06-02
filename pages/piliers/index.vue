<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-pilier></list-pilier>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListPilier from '@/components/piliers/ListPilier'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-piliers')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListPilier
    },
    mounted: function() {
      this.$store.dispatch('piliers/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'piliers', icon: 'mdi-lock',link:'/piliers',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des piliers',
            disabled: true,
            to: '/piliers',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
