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
          <list-role></list-role>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListRole from '@/components/roles/ListRole'
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
      ListRole
    },
    mounted: function() {
      this.$store.dispatch('roles/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock-outline',link:'/roles',position:1  },
          { text: 'Permissions', icon: 'mdi-lock-outline',link:'/permissions',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des roles',
            disabled: true,
            to: '/roles',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
