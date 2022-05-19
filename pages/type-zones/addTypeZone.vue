<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-add-type-zone></form-add-type-zone>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddTypeZone from '@/components/type-zones/FormAddTypeZone';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddTypeZone
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
          text: 'Nouveau de type zone d\'intervention',
          disabled: false,
          to: '/type-zones/addTypeZone',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
