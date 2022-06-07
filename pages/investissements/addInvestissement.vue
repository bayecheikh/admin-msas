<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
     
      <v-container pl-0 pt-2 pb-10 pr-0>
        <form-add-investissement></form-add-investissement>
      </v-container>        
 
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormAddInvestissement from '@/components/investissements/FormAddInvestissement';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormAddInvestissement
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-investissements')){
        return redirect('/')
      }
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('investissements/getList')
      this.$store.dispatch('fournisseurs/getList') */
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
      this.$store.dispatch('dimensions/getList')
      this.$store.dispatch('regions/getList')
      this.$store.dispatch('structures/getList')
      this.$store.dispatch('modefinancements/getList')
      this.$store.dispatch('piliers/getList')
    },
    data () {
      return {
        headerItems: [
        {
          text: 'investissements',
          disabled: false,
          to: '/investissements',
          exact: true
        },
        {
          text: 'Nouvelle investissement',
          disabled: false,
          to: '/investissements/addinvestissement',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
