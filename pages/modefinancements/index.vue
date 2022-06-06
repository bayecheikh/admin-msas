<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-mode-financement></list-mode-financement>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListModeFinancement from '@/components/modefinancements/ListModeFinancement'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-modefinancements')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListModeFinancement
    },
    mounted: function() {
      this.$store.dispatch('modefinancements/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'modefinancements', icon: 'mdi-lock',link:'/modefinancements',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des modefinancements',
            disabled: true,
            to: '/modefinancements',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
