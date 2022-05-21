<template>

  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container>
        <list-structure></list-structure>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import PageHeader from '@/components/PageHeader';
import ListStructure from '@/components/structures/ListStructure'
import { mapActions} from 'vuex'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-structures')){
        return redirect('/')
      }
    },
    components: {
      PageHeader,
      ListStructure
    },
    mounted: function() {
      /* this.$store.dispatch('structures/getList',1) */
    },
    data () {
      return {
        selectedItem: 0,
        headerItems: [
          {
            text: 'Liste des structures',
            disabled: true,
            to: '/structures',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>
.bg-title {
  background-color: rgb(227, 235, 243) !important;
  color: #6F96AA;
}
</style>
