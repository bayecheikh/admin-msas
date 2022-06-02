<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-axe></list-axe>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListAxe from '@/components/axes/ListAxe'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-axes')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListAxe
    },
    mounted: function() {
      this.$store.dispatch('axes/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Axes', icon: 'mdi-lock',link:'/axes',position:1  },
          { text: 'axes', icon: 'mdi-lock',link:'/axes',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des axes',
            disabled: true,
            to: '/axes',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
