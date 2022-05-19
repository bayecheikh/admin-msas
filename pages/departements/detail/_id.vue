<template>
  <div p-6 class="bg-title">
    <v-row>
      <v-col md="2" lg="2" sm="12" >
        <v-container pl-0>
          <left-menu :items="leftmenuItems"></left-menu>
        </v-container>
      </v-col>

      <v-col md="10" lg="10" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-departement></info-departement>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-departement></actions-departement>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoDepartement from '@/components/departements/detail/InfoDepartement';
import ActionsDepartement from '@/components/departements/detail/ActionsDepartement';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoDepartement,
      ActionsDepartement
    },
    middleware: function ({redirect,$hasDepartement}) {
      if(!$hasDepartement('gerer-departements')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'Departements', icon: 'mdi-lock',link:'/departements',position:2  }
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
