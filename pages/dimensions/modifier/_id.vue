<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-dimension></form-update-dimension>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateDimension from '@/components/dimensions/modifier/FormUpdateDimension';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateDimension
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
          text: 'Detail dimension',
          disabled: true,
          to: '/dimensions/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
