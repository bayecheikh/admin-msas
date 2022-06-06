<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-monnaie></list-monnaie>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListMonnaie from '@/components/monnaies/ListMonnaie'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-monnaies')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListMonnaie
    },
    mounted: function() {
      this.$store.dispatch('monnaies/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'monnaies', icon: 'mdi-lock',link:'/monnaies',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des monnaies',
            disabled: true,
            to: '/monnaies',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
