<template>
<div>
  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card flat class="mx-auto">  
      <v-container pl-10 pt-10 pb-10 pr-10>
          <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12" class="my-5">
              <actions-investissement></actions-investissement>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-investissement></info-investissement>
            </v-col>
            
          </v-row>
      </v-container>        
    </v-card>
  </div>
</div>
  
  
</template>

<script>
import PageHeader from '@/components/PageHeader';
import InfoInvestissement from '@/components/investissements/detail/InfoInvestissement';
import ActionsInvestissement from '@/components/investissements/detail/ActionsInvestissement';
import HistoriqueInvestissement from '@/components/investissements/detail/HistoriqueInvestissement';
  export default {
    layout: "dashboard",
    components: {
      PageHeader,
      InfoInvestissement,
      ActionsInvestissement,
      HistoriqueInvestissement,
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-investissements')){
        return redirect('/')
      }
    },
    data () {
      return {
        id : this.$nuxt._route.params.id,
        headerItems: [
        {
          text: 'investissements',
          disabled: false,
          to: '/investissements',
          exact: true
        },
        {
          text: 'Detail investissement',
          disabled: true,
          to: '/investissements/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
