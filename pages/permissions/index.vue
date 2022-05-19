<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-permission></list-permission>
      </v-container>        
    </v-card>
  </div>
  
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
