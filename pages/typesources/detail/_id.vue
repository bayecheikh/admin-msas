<template>
  <div p-6 class="bg-title">
    <v-row>
      <v-col md="10" lg="10" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-typesource></info-typesource>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-typesource></actions-typesource>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoTypesource from '@/components/typesources/detail/InfoTypesource';
import ActionsTypesource from '@/components/typesources/detail/ActionsTypesource';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoTypesource,
      ActionsTypesource
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-type-sources')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Type sources',
          disabled: false,
          to: '/typesources',
          exact: true
        },
        {
          text: 'Detail type source',
          disabled: true,
          to: '/typesources/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
