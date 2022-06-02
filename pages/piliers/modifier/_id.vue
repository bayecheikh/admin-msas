<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-pilier></form-update-pilier>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdatePilier from '@/components/piliers/modifier/FormUpdatePilier';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdatePilier
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-piliers')){
        return redirect('/')
      }
    },
     mounted: function() {
      this.$store.dispatch('axes/getList')
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Piliers', icon: 'mdi-lock',link:'/piliers',position:1  },
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
          text: 'Detail pilier',
          disabled: true,
          to: '/piliers/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
