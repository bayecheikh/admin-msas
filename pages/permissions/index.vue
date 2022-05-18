<template>
  <v-container pl-0>
    <v-row>
      <v-col md="2" lg="2" sm="12">
        <v-container pl-0>
          <left-menu :items="leftmenuItems"></left-menu>
        </v-container>
      </v-col>
      <v-col md="9" lg="9" sm="12" class="full-height">
          <page-header :items="headerItems"></page-header>
          <list-permission></list-permission>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListPermission from '@/components/permissions/ListPermission'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-securite')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListPermission
    },
    mounted: function() {
      this.$store.dispatch('permissions/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'Permissions', icon: 'mdi-lock',link:'/permissions',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des permissions',
            disabled: true,
            to: '/permissions',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
