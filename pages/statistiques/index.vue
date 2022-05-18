<template>
  <v-container grid-list-xl fluid>
    <list-chart></list-chart>
  </v-container>
  
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
