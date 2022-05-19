<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-type-zone></form-update-type-zone>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateTypeZone from '@/components/type-zones/modifier/FormUpdateTypeZone';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateTypeZone
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-type-zones')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'type-zones',
          disabled: false,
          to: '/type-zones',
          exact: true
        },
        {
          text: 'Detail type-zone',
          disabled: true,
          to: '/type-zones/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
