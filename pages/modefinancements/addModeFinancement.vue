<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-add-mode-financement></form-add-mode-financement>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormAddModeFinancement from '@/components/modefinancements/FormAddModeFinancement';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormAddModeFinancement
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-modefinancements')){
        return redirect('/')
      }
    },
    data () {
      return {
        headerItems: [
        {
          text: 'modefinancements',
          disabled: false,
          to: '/modefinancements',
          exact: true
        },
        {
          text: 'Nouvelle modefinancement',
          disabled: false,
          to: '/modefinancements/addModeFinancement',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
