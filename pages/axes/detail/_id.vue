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
              <info-axe></info-axe>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-axe></actions-axe>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import Infoaxe from '@/components/axes/detail/Infoaxe';
import ActionsAxe from '@/components/axes/detail/ActionsAxe';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      Infoaxe,
      ActionsAxe
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-axes')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Axes', icon: 'mdi-lock',link:'/axes',position:1  },
          { text: 'axes', icon: 'mdi-lock',link:'/axes',position:2  }
        ],
        headerItems: [
        {
          text: 'axes',
          disabled: false,
          to: '/axes',
          exact: true
        },
        {
          text: 'Detail axe',
          disabled: true,
          to: '/axes/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
