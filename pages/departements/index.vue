<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-departement></list-departement>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListDepartement from '@/components/departements/ListDepartement'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-departements')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListDepartement
    },
    mounted: function() {
      this.$store.dispatch('departements/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'departements', icon: 'mdi-lock',link:'/departements',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des departements',
            disabled: true,
            to: '/departements',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
