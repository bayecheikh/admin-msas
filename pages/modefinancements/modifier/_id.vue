<template>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
        <form-update-mode-financement></form-update-mode-financement>
      </v-container>        
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import FormUpdateModeFinancement from '@/components/modefinancements/modifier/FormUpdateModeFinancement';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      FormUpdateModeFinancement
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
          text: 'Detail modefinancement',
          disabled: true,
          to: '/modefinancements/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
