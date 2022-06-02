<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-type-ligne></list-type-ligne>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListTypeLigne from '@/components/typelignes/ListTypeLigne'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-typelignes')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListTypeLigne
    },
    mounted: function() {
      this.$store.dispatch('typelignes/getList')
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des typelignes',
            disabled: true,
            to: '/typelignes',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
