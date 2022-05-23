<template>

  <div p-6 class="bg-title">
    <page-header :items="headerItems" class="pb-4"></page-header>
    <v-card class="mx-auto pl-0 pt-0 pb-10 pr-0">  
      <v-container>
        <list-chart></list-chart>
      </v-container>        
    </v-card>
  </div>
  
</template>

<script>
import ListChart from '@/components/statistiques/charts/ListChart';
  export default {
    layout: "dashboard",
    components: {
      ListChart
    }

  }
</script>

<style scoped>

</style>
