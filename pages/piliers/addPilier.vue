<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-add-pilier></form-add-pilier>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddPilier from '@/components/piliers/FormAddPilier';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddPilier
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-piliers')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'piliers', icon: 'mdi-lock',link:'/piliers',position:2  }
        ],
        headerItems: [
        {
          text: 'piliers',
          disabled: false,
          to: '/piliers',
          exact: true
        },
        {
          text: 'Nouveau pilier',
          disabled: false,
          to: '/piliers/addPilier',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
