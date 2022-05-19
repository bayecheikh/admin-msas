<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-role></list-role>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListRole from '@/components/roles/ListRole'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-roles')){
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
