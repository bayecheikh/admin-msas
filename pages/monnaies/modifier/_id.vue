<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-monnaie></form-update-monnaie>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateMonnaie from '@/components/monnaies/modifier/FormUpdateMonnaie';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateMonnaie
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-monnaies')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'monnaies',
          disabled: false,
          to: '/monnaies',
          exact: true
        },
        {
          text: 'Detail monnaie',
          disabled: true,
          to: '/monnaies/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
