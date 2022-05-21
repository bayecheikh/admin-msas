<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-source></form-update-source>
      </v-container>        
    </v-card>
  </div>
  
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormUpdateSource from '@/components/sources/modifier/FormUpdateSource';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormUpdateSource
    },
    mounted: function() {
      this.$store.dispatch('typesources/getList')
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-source-financement')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'sources',
          disabled: false,
          to: '/sources',
          exact: true
        },
        {
          text: 'Modification',
          disabled: true,
          to: '/sources/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
