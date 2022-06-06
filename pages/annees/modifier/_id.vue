<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-annee></form-update-annee>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateAnnee from '@/components/annees/modifier/FormUpdateAnnee';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateAnnee
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-annees')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'annees',
          disabled: false,
          to: '/annees',
          exact: true
        },
        {
          text: 'Detail annee',
          disabled: true,
          to: '/annees/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
