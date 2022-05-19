<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-region></list-region>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import ListRegion from '@/components/regions/ListRegion'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-regions')){
        return redirect('/')
      }
    },
    components: {
      PageHeader,
      ListRegion
    },
    mounted: function() {
      this.$store.dispatch('regions/getList')
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des regions',
            disabled: true,
            to: '/regions',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
