<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto pl-0 pt-10 pb-10 pr-0">  
      <v-container>
        <list-investissement></list-investissement>
      </v-container>        
    </v-card>
  </div> 
</template>

<script>
import PageHeader from '@/components/PageHeader';
import ListInvestissement from '@/components/investissements/ListInvestissement'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-investissements')){
        return redirect('/')
      }
    },
    components: {
      PageHeader,
      ListInvestissement
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('investissements/getList')
      this.$store.dispatch('fournisseurs/getList') */
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des investissements',
            disabled: true,
            to: '/investissements',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
.bg-title {
  background-color: rgb(227, 235, 243) !important;
  color: #6F96AA;
}
</style>
