<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-typesource></list-typesource>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListTypesource from '@/components/typesources/ListTypesource'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-type-sources')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListTypesource
    },
    mounted: function() {
      this.$store.dispatch('typesources/getList')
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des type sources',
            disabled: true,
            to: '/typesources',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
