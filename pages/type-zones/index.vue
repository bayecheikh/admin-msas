<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-type-zone></list-type-zone>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import PageHeader from '@/components/PageHeader';
import ListTypeZone from '@/components/type-zones/ListTypeZone'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-type-zones')){
        return redirect('/')
      }
    },
    components: {
      PageHeader,
      ListTypeZone
    },
    mounted: function() {
      this.$store.dispatch('type-zones/getList')
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des types de zone d\'intervention',
            disabled: true,
            to: '/type-zones',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
