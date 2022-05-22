<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
     
      <v-container pl-10 pt-2 pb-10 pr-10>
        <form-add-structure></form-add-structure>
      </v-container>        
 
  </div>
  
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormAddStructure from '@/components/structures/FormAddStructure';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormAddStructure
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-structures')){
        return redirect('/')
      }
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('structures/getList')
      this.$store.dispatch('fournisseurs/getList') */
      this.$store.dispatch('type-zones/getList')
      this.$store.dispatch('typesources/getList')
      this.$store.dispatch('sources/getList')
      this.$store.dispatch('regions/getList')
      this.$store.dispatch('departements/getList')
      this.$store.dispatch('dimensions/getList')
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Structures',
          disabled: false,
          to: '/structures',
          exact: true
        },
        {
          text: 'Nouvelle structure',
          disabled: false,
          to: '/structures/addStructure',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
