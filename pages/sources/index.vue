<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-source></list-source>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListSource from '@/components/sources/ListSource'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-source-financement')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListSource
    },
    mounted: function() {
      this.$store.dispatch('sources/getList')
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des sources',
            disabled: true,
            to: '/sources',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
