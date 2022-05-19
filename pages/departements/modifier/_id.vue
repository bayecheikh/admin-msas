<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-departement></form-update-departement>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateDepartement from '@/components/departements/modifier/FormUpdateDepartement';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateDepartement
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-departements')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'departements', icon: 'mdi-lock',link:'/departements',position:2  }
        ],
        headerItems: [
        {
          text: 'Departements',
          disabled: false,
          to: '/departements',
          exact: true
        },
        {
          text: 'Detail departement',
          disabled: true,
          to: '/departements/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
