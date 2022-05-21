<template>
  <div p-6 class="bg-title">
    <v-row>
      <v-col md="10" lg="10" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-source></info-source>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-source></actions-source>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoSource from '@/components/sources/detail/InfoSource';
import ActionsSource from '@/components/sources/detail/ActionsSource';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      Infosource,
      Actionssource
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-source-financement')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'sources',
          disabled: false,
          to: '/sources',
          exact: true
        },
        {
          text: 'Detail source',
          disabled: true,
          to: '/sources/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
