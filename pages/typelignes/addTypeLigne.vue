<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-add-type-ligne></form-add-type-ligne>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddTypeLigne from '@/components/typelignes/FormAddTypeLigne';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddTypeLigne
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-typelignes')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'typelignes',
          disabled: false,
          to: '/typelignes',
          exact: true
        },
        {
          text: 'Nouveau typeligne',
          disabled: false,
          to: '/typelignes/addTypeLigne',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
