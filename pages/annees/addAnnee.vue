<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-add-annee></form-add-annee>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddAnnee from '@/components/annees/FormAddAnnee';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddAnnee
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
          text: 'Nouvelle annee',
          disabled: false,
          to: '/annees/addAnnee',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
