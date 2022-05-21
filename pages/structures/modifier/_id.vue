<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-structure></form-update-structure>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateStructure from '@/components/structures/modifier/FormUpdateStructure';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateStructure
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-structures')){
        return redirect('/')
      }
    },
    mounted: function() {
      //this.$store.dispatch('roles/getList')
      /* this.$store.dispatch('structures/getList')
      this.$store.dispatch('fournisseurs/getList') */
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
          text: 'Detail structure',
          disabled: true,
          to: '/structures/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
