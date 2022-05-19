<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-add-dimension></form-add-dimension>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddDimension from '@/components/dimensions/FormAddDimension';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddDimension
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-dimensions')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'dimensions',
          disabled: false,
          to: '/dimensions',
          exact: true
        },
        {
          text: 'Nouvelle dimension',
          disabled: false,
          to: '/dimensions/addDimension',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
