<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-region></form-update-region>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateRegion from '@/components/regions/modifier/FormUpdateRegion';
 export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateRegion
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-regions')){
        return redirect('/')
      }
    },
    mounted: function() {
      this.$store.dispatch('departements/getList')
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Regions',
          disabled: false,
          to: '/regions',
          exact: true
        },
        {
          text: 'Nouveau region',
          disabled: false,
          to: '/regions/addregion',
          exact: true
        }
        
        ],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date3: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu1: false,
        menu2: false,
        menu3: false,
        modal: false,
        regions: ['Sperviseur national'],
        localisations: ['Thiès','Dakar'],

      }
    }

  }
</script>

<style scoped>

</style>
