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
              <info-region></info-region>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-region></actions-region>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoRegion from '@/components/regions/detail/InfoRegion';
import ActionsRegion from '@/components/regions/detail/ActionsRegion';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoRegion,
      ActionsRegion
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-regions')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'regions', icon: 'mdi-lock',link:'/regions',position:2  }
        ],
        headerItems: [
        {
          text: 'regions',
          disabled: false,
          to: '/regions',
          exact: true
        },
        {
          text: 'Detail region',
          disabled: true,
          to: '/regions/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
